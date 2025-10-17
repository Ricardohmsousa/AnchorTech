from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore, auth as firebase_auth
import os
import shutil
import jwt
from datetime import datetime, timedelta
import stripe

# Load environment variables from .env file
load_dotenv()

# Stripe configuration - using older stable version approach
stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
if stripe_secret_key:
    stripe.api_key = stripe_secret_key
else:
    print("[STRIPE] ERROR: No Stripe secret key found in environment variables!")
    print("[STRIPE] Please set STRIPE_SECRET_KEY environment variable")

security = HTTPBearer()

def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="No authorization header")
    
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

app = FastAPI()

# JWT secret and config
JWT_SECRET = os.environ.get("JWT_SECRET", "dev_secret_key_change_me")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 3600

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/cases/{case_id}/upload")
async def upload_case_files(case_id: str, files: list[UploadFile] = File(...)):
    # Save uploaded files to backend/uploads/case_{case_id}/
    case_dir = os.path.join(UPLOAD_DIR, f"case_{case_id}")
    os.makedirs(case_dir, exist_ok=True)
    saved_files = []
    for file in files:
        file_path = os.path.join(case_dir, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        saved_files.append(file.filename)
    # Save file metadata in Firestore under the case document
    case_ref = db.collection("cases").document(case_id)
    case_ref.update({
        "files": firestore.ArrayUnion(saved_files),
        "files_updated_at": firestore.SERVER_TIMESTAMP
    })
    return {"uploaded": saved_files}

@app.get("/cases/{case_id}/files")
def list_case_files(case_id: str):
    # List files for a case
    case_dir = os.path.join(UPLOAD_DIR, f"case_{case_id}")
    if not os.path.exists(case_dir):
        return {"files": []}
    return {"files": os.listdir(case_dir)}

@app.get("/cases/{case_id}/files/{filename}")
def get_case_file(case_id: str, filename: str):
    # Serve a file for a case
    from fastapi.responses import FileResponse
    case_dir = os.path.join(UPLOAD_DIR, f"case_{case_id}")
    file_path = os.path.join(case_dir, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path, filename=filename)

# Get allowed origins from environment variable, with defaults for development
import os
allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Load environment variables from .env
load_dotenv()

# Initialize Firebase
FIREBASE_CRED_PATH = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "firebase_service_account.json")

# Check if credentials are provided as JSON string in environment (for Railway/cloud deployment)
firebase_creds_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
if firebase_creds_json:
    import json
    try:
        cred_dict = json.loads(firebase_creds_json)
        cred = credentials.Certificate(cred_dict)
    except json.JSONDecodeError:
        cred = credentials.Certificate(FIREBASE_CRED_PATH)
else:
    cred = credentials.Certificate(FIREBASE_CRED_PATH)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()



class RegisterRequest(BaseModel):
    username: str
    name: Optional[str] = None
    password: str
    user_type: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    username: str
    id: str
    user_type: str
    token: str = None

class PaymentIntentRequest(BaseModel):
    amount: int  # Amount in cents
    service_type: str

class CaseCreateRequest(BaseModel):
    user_id: str
    payment_intent_id: Optional[str] = None

class CaseStatusUpdateRequest(BaseModel):
    status: str

class CaseResponse(BaseModel):
    id: str
    user_id: str
    client_name: Optional[str] = None  # Client name saved in case
    collaborator_id: Optional[str]
    collaborator_name: Optional[str] = None  # Collaborator name saved in case
    status: str
    created_at: str = None
    updated_at: str = None
    payment_verified: Optional[bool] = None
    payment_intent_id: Optional[str] = None
    payment_amount: Optional[int] = None

@app.post("/login", response_model=UserResponse)
def login(data: LoginRequest):
    users_ref = db.collection("users")
    query = users_ref.where("username", "==", data.username).where("password", "==", data.password).limit(1).stream()
    user = next(query, None)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user_data = user.to_dict()
    payload = {
        "user_id": user.id,
        "username": user_data["username"],
        "user_type": user_data.get("user_type", "client"),
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"username": user_data["username"], "id": user.id, "user_type": user_data.get("user_type", "client"), "token": token}

@app.post("/firebase-auth")
def firebase_auth_login(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verify Firebase ID token and return backend JWT token
    """
    if not credentials:
        raise HTTPException(status_code=401, detail="No authorization header")
    
    firebase_token = credentials.credentials
    
    try:
        # Verify Firebase ID token
        decoded_token = firebase_auth.verify_id_token(firebase_token)
        firebase_uid = decoded_token['uid']
        email = decoded_token.get('email')
        display_name = decoded_token.get('name', email.split('@')[0] if email else 'User')
        
        # Check if user exists in Firestore, create if not
        users_ref = db.collection("users")
        query = list(users_ref.where("firebase_uid", "==", firebase_uid).limit(1).stream())
        
        if not query:
            # Create new user in Firestore
            doc_ref = users_ref.document()
            user_data = {
                "firebase_uid": firebase_uid,
                "email": email,
                "username": display_name,
                "name": display_name,
                "user_type": "client",  # Default to client
                "created_at": datetime.utcnow()
            }
            doc_ref.set(user_data)
            user_id = doc_ref.id
        else:
            # Get existing user
            user_doc = query[0]
            user_data = user_doc.to_dict()
            user_id = user_doc.id
        
        # Generate JWT token for backend authorization
        payload = {
            "user_id": user_id,
            "firebase_uid": firebase_uid,
            "email": email,
            "username": user_data.get("username", display_name),
            "user_type": user_data.get("user_type", "client"),
            "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        
        backend_jwt = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
        return {
            "access_token": backend_jwt,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "firebase_uid": firebase_uid,
                "email": email,
                "username": user_data.get("username", display_name),
                "name": user_data.get("name", display_name),
                "user_type": user_data.get("user_type", "client")
            }
        }
        
    except firebase_auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")
    except firebase_auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="Firebase token expired")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Authentication failed: {str(e)}")

@app.post("/register", response_model=UserResponse)
def register(data: RegisterRequest):
    if data.user_type not in ["collaborator", "client"]:
        raise HTTPException(status_code=400, detail="Invalid user type")
    users_ref = db.collection("users")
    # Check if username exists
    existing = list(users_ref.where("username", "==", data.username).limit(1).stream())
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    doc_ref = users_ref.document()
    doc_ref.set({
        "username": data.username,
        "name": data.name if data.name else data.username,  # Use name if provided, otherwise username
        "password": data.password,
        "user_type": data.user_type
    })
    payload = {
        "user_id": doc_ref.id,
        "username": data.username,
        "user_type": data.user_type,
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"username": data.username, "id": doc_ref.id, "user_type": data.user_type, "token": token}

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: str, token_data: dict = Depends(verify_jwt_token)):
    # Only allow user to get their own info or if collaborator
    if token_data["user_id"] != user_id and token_data["user_type"] != "collaborator":
        raise HTTPException(status_code=403, detail="Not authorized")
    user_doc = db.collection("users").document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
    user = user_doc.to_dict()
    return {"username": user["username"], "id": user_doc.id, "user_type": user.get("user_type", "client")}

# Payment endpoints
@app.post("/create-payment-intent")
def create_payment_intent(payment_request: PaymentIntentRequest, token_data: dict = Depends(verify_jwt_token)):
    try:
        # Check if Stripe is properly configured
        if not stripe.api_key:
            raise HTTPException(status_code=500, detail="Payment system not configured - missing Stripe key")
        
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=payment_request.amount,
            currency='eur',
            metadata={
                'service_type': payment_request.service_type,
                'user_id': token_data["user_id"]
            }
        )
        
        return {"client_secret": intent.client_secret}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=f"Stripe error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create payment intent: {str(e)}")

@app.post("/verify-payment")
def verify_payment(payment_intent_id: str, token_data: dict = Depends(verify_jwt_token)):
    try:
        # Retrieve the payment intent from Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if intent.status == 'succeeded':
            # Payment was successful
            return {
                "status": "succeeded",
                "amount": intent.amount,
                "currency": intent.currency,
                "metadata": intent.metadata
            }
        else:
            return {"status": intent.status}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to verify payment")

def _serialize_case(case: dict, id: str = None):
    # Helper to convert Firestore timestamps to ISO strings
    if "created_at" in case and case["created_at"] is not None:
        case["created_at"] = case["created_at"].isoformat() if hasattr(case["created_at"], "isoformat") else str(case["created_at"])
    if "updated_at" in case and case["updated_at"] is not None:
        case["updated_at"] = case["updated_at"].isoformat() if hasattr(case["updated_at"], "isoformat") else str(case["updated_at"])
    # Ensure required fields are present
    if id:
        case["id"] = str(id)
    else:
        case["id"] = ""
    if "collaborator_id" not in case:
        case["collaborator_id"] = None
    if "status" not in case or case["status"] is None:
        case["status"] = "uploaded"
    if "user_id" not in case:
        case["user_id"] = None
    
    # Use saved names from case data (much more efficient than fetching from database)
    case["collaborator_name"] = case.get("collaborator_name", "Unknown Collaborator") if case.get("collaborator_id") else None
    case["client_name"] = case.get("client_name", "Unknown Client") if case.get("user_id") else None
    
    return case

@app.post("/cases", response_model=CaseResponse)
def create_case(data: CaseCreateRequest, token_data: dict = Depends(verify_jwt_token)):
    # Only allow user to create their own case
    if token_data["user_id"] != data.user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Get client name from user document
    client_doc = db.collection("users").document(data.user_id).get()
    if not client_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")
    
    client_data = client_doc.to_dict()
    client_name = client_data.get("name") or client_data.get("username", "Unknown Client")
    
    # Verify payment if payment_intent_id is provided
    payment_verified = False
    payment_amount = None
    if data.payment_intent_id:
        try:
            intent = stripe.PaymentIntent.retrieve(data.payment_intent_id)
            if intent.status == 'succeeded':
                payment_verified = True
                payment_amount = intent.amount
            else:
                raise HTTPException(status_code=400, detail="Payment not completed")
        except stripe.error.StripeError as e:
            raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")
    
    # Find the collaborator with the fewest cases for load balancing
    print(f"[CASE_ASSIGNMENT] Finding collaborator with least cases...")
    collaborators = list(db.collection("users").where("user_type", "==", "collaborator").stream())
    
    if not collaborators:
        print(f"[CASE_ASSIGNMENT] No collaborators found")
        collaborator_id = None
        collaborator_name = None
    else:
        print(f"[CASE_ASSIGNMENT] Found {len(collaborators)} collaborators")
        
        # Count cases for each collaborator
        collaborator_case_counts = []
        for collab in collaborators:
            case_count = len(list(db.collection("cases").where("collaborator_id", "==", collab.id).stream()))
            collaborator_case_counts.append({
                'id': collab.id, 
                'username': collab.to_dict().get('username', 'Unknown'),
                'name': collab.to_dict().get('name', ''),
                'case_count': case_count
            })
            print(f"[CASE_ASSIGNMENT] Collaborator {collab.to_dict().get('username', 'Unknown')} has {case_count} cases")
        
        # Sort by case count (ascending) and pick the one with least cases
        collaborator_case_counts.sort(key=lambda x: x['case_count'])
        selected_collaborator = collaborator_case_counts[0]
        collaborator_id = selected_collaborator['id']
        collaborator_name = selected_collaborator['name'] or selected_collaborator['username']
        
        print(f"[CASE_ASSIGNMENT] Assigned to collaborator '{selected_collaborator['username']}' ({selected_collaborator['name']}) with {selected_collaborator['case_count']} cases")
        
    case_ref = db.collection("cases").document()
    case_data = {
        "user_id": data.user_id,
        "client_name": client_name,  # Save client name in case
        "collaborator_id": collaborator_id,
        "collaborator_name": collaborator_name,  # Save collaborator name in case
        "status": "uploaded",
        "created_at": firestore.SERVER_TIMESTAMP,
        "updated_at": firestore.SERVER_TIMESTAMP,
        "payment_verified": payment_verified,
        "payment_intent_id": data.payment_intent_id,
        "payment_amount": payment_amount
    }
    case_ref.set(case_data)
    # Always return the case with its ID
    case = case_ref.get().to_dict()
    return _serialize_case(case, case_ref.id)
# Endpoint for client to fetch their own cases
@app.get("/users/{user_id}/cases")
def get_user_cases(user_id: str, token_data: dict = Depends(verify_jwt_token)):
    # Only allow user to get their own cases, or collaborator to get only their assigned cases
    if token_data["user_id"] == user_id:
        # User can see their own cases
        cases = db.collection("cases").where("user_id", "==", user_id).stream()
        return [_serialize_case(doc.to_dict(), doc.id) for doc in cases]
    elif token_data["user_type"] == "collaborator":
        # Collaborator can only see cases assigned to them
        cases = db.collection("cases").where("user_id", "==", user_id).where("collaborator_id", "==", token_data["user_id"]).stream()
        return [_serialize_case(doc.to_dict(), doc.id) for doc in cases]
    else:
        raise HTTPException(status_code=403, detail="Not authorized")

@app.get("/cases/{case_id}", response_model=CaseResponse)
def get_case(case_id: str, token_data: dict = Depends(verify_jwt_token)):
    case_doc = db.collection("cases").document(case_id).get()
    if not case_doc.exists:
        raise HTTPException(status_code=404, detail="Case not found")
    case = case_doc.to_dict()
    # Only allow user to get their own case, or assigned collaborator
    if token_data["user_id"] == case["user_id"]:
        return _serialize_case(case, case_doc.id)
    if token_data["user_type"] == "collaborator" and token_data["user_id"] == case.get("collaborator_id"):
        return _serialize_case(case, case_doc.id)
    raise HTTPException(status_code=403, detail="Not authorized")

@app.patch("/cases/{case_id}/status", response_model=CaseResponse)
def update_case_status(case_id: str, data: CaseStatusUpdateRequest, token_data: dict = Depends(verify_jwt_token)):
    case_ref = db.collection("cases").document(case_id)
    case = case_ref.get().to_dict()
    # Only allow collaborator or case owner
    if token_data["user_id"] != case["user_id"] and token_data["user_type"] != "collaborator":
        raise HTTPException(status_code=403, detail="Not authorized")
    case_ref.update({
        "status": data.status,
        "updated_at": firestore.SERVER_TIMESTAMP
    })
    case = case_ref.get().to_dict()
    return _serialize_case(case, case_id)

@app.get("/collaborators/{collaborator_id}/cases", response_model=List[CaseResponse])
def get_collaborator_cases(collaborator_id: str, token_data: dict = Depends(verify_jwt_token)):
    print(f"[COLLAB_CASES] Request from user {token_data['user_id']} (type: {token_data['user_type']}) for collaborator {collaborator_id}")
    
    # Allow access if:
    # 1. The requesting user is the collaborator whose cases are being requested
    # 2. OR the requesting user is any collaborator (can see other collaborator's cases)
    if token_data["user_type"] != "collaborator":
        print(f"[COLLAB_CASES] Access denied - user is not a collaborator")
        raise HTTPException(status_code=403, detail="Only collaborators can access this endpoint")
    
    if token_data["user_id"] != collaborator_id:
        print(f"[COLLAB_CASES] Collaborator {token_data['user_id']} accessing cases of collaborator {collaborator_id}")
    
    cases = db.collection("cases").where("collaborator_id", "==", collaborator_id).stream()
    case_list = [_serialize_case(doc.to_dict(), doc.id) for doc in cases]
    print(f"[COLLAB_CASES] Returning {len(case_list)} cases for collaborator {collaborator_id}")
    
    # Debug: Check if client names are being added
    for case in case_list:
        print(f"[COLLAB_CASES] Case {case.get('id', 'unknown')[:8]}: client_name={case.get('client_name')}, user_id={case.get('user_id')}")
    
    return case_list

# --- Chat Message Models & Endpoints ---
class MessageRequest(BaseModel):
    text: str

class MessageResponse(BaseModel):
    sender_id: str
    sender_type: str
    sender_name: str
    text: str
    timestamp: str
    # New fields for conversation context
    client_name: Optional[str] = None
    collaborator_name: Optional[str] = None

@app.get("/cases/{case_id}/messages", response_model=List[MessageResponse])
def get_case_messages(case_id: str, token_data: dict = Depends(verify_jwt_token)):
    # Only allow user or assigned collaborator to view messages
    case_doc = db.collection("cases").document(case_id).get()
    if not case_doc.exists:
        raise HTTPException(status_code=404, detail="Case not found")
    case = case_doc.to_dict()
    if token_data["user_id"] != case["user_id"] and token_data["user_id"] != case.get("collaborator_id"):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Get client and collaborator information for context
    client_name = "Unknown Client"
    collaborator_name = "Unassigned"
    
    print(f"[CHAT_CONTEXT] Getting context for case. user_id: {case.get('user_id')}, collaborator_id: {case.get('collaborator_id')}")
    
    # Fetch client information
    if case.get("user_id"):
        client_doc = db.collection("users").document(case["user_id"]).get()
        if client_doc.exists:
            client_data = client_doc.to_dict()
            client_name = client_data.get("name") or client_data.get("username", "Unknown Client")
            print(f"[CHAT_CONTEXT] Client name resolved: '{client_name}' for user_id: {case['user_id']}")
        else:
            print(f"[CHAT_CONTEXT] Client document not found for user_id: {case['user_id']}")
    
    # Fetch collaborator information
    if case.get("collaborator_id"):
        collaborator_doc = db.collection("users").document(case["collaborator_id"]).get()
        if collaborator_doc.exists:
            collaborator_data = collaborator_doc.to_dict()
            collaborator_name = collaborator_data.get("name") or collaborator_data.get("username", "Unknown Collaborator")
            print(f"[CHAT_CONTEXT] Collaborator name resolved: '{collaborator_name}' for collaborator_id: {case['collaborator_id']}")
        else:
            print(f"[CHAT_CONTEXT] Collaborator document not found for collaborator_id: {case['collaborator_id']}")
    
    print(f"[CHAT_CONTEXT] Final context - Client: '{client_name}', Collaborator: '{collaborator_name}'")
    
    messages_ref = db.collection("cases").document(case_id).collection("messages").order_by("timestamp")
    messages = messages_ref.stream()
    result = []
    for msg in messages:
        m = msg.to_dict()
        sender_id = m.get("sender_id")
        
        # Fetch sender information to get name
        sender_name = "Unknown User"
        if sender_id:
            sender_doc = db.collection("users").document(sender_id).get()
            if sender_doc.exists:
                sender_data = sender_doc.to_dict()
                # Use name if available, fallback to username
                sender_name = sender_data.get("name") or sender_data.get("username", "Unknown User")
        
        result.append({
            "sender_id": sender_id,
            "sender_type": m.get("sender_type"),
            "sender_name": sender_name,
            "text": m.get("text"),
            "timestamp": m.get("timestamp").isoformat() if hasattr(m.get("timestamp"), "isoformat") else str(m.get("timestamp")),
            "client_name": client_name,
            "collaborator_name": collaborator_name
        })
    return result

@app.post("/cases/{case_id}/messages", response_model=MessageResponse)
def send_case_message(case_id: str, data: MessageRequest, token_data: dict = Depends(verify_jwt_token)):
    # Only allow user or assigned collaborator to send messages
    case_doc = db.collection("cases").document(case_id).get()
    if not case_doc.exists:
        raise HTTPException(status_code=404, detail="Case not found")
    case = case_doc.to_dict()
    if token_data["user_id"] != case["user_id"] and token_data["user_id"] != case.get("collaborator_id"):
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Get client and collaborator information for context
    client_name = "Unknown Client"
    collaborator_name = "Unassigned"
    
    # Fetch client information
    if case.get("user_id"):
        client_doc = db.collection("users").document(case["user_id"]).get()
        if client_doc.exists:
            client_data = client_doc.to_dict()
            client_name = client_data.get("name") or client_data.get("username", "Unknown Client")
    
    # Fetch collaborator information
    if case.get("collaborator_id"):
        collaborator_doc = db.collection("users").document(case["collaborator_id"]).get()
        if collaborator_doc.exists:
            collaborator_data = collaborator_doc.to_dict()
            collaborator_name = collaborator_data.get("name") or collaborator_data.get("username", "Unknown Collaborator")
    
    # Get sender name
    sender_name = "Unknown User"
    sender_doc = db.collection("users").document(token_data["user_id"]).get()
    if sender_doc.exists:
        sender_data = sender_doc.to_dict()
        sender_name = sender_data.get("name") or sender_data.get("username", "Unknown User")
    
    msg_data = {
        "sender_id": token_data["user_id"],
        "sender_type": token_data["user_type"],
        "text": data.text,
        "timestamp": firestore.SERVER_TIMESTAMP
    }
    msg_ref = db.collection("cases").document(case_id).collection("messages").document()
    msg_ref.set(msg_data)
    # Fetch with timestamp
    msg = msg_ref.get().to_dict()
    return {
        "sender_id": msg["sender_id"],
        "sender_type": msg["sender_type"],
        "sender_name": sender_name,
        "text": msg["text"],
        "timestamp": msg["timestamp"].isoformat() if hasattr(msg["timestamp"], "isoformat") else str(msg["timestamp"]),
        "client_name": client_name,
        "collaborator_name": collaborator_name
    }

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
