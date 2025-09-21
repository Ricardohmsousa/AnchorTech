# FastAPI + React Project

## Backend (FastAPI)

1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. (Recommended) Create a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Install FastAPI and Uvicorn:
   ```powershell
   pip install fastapi uvicorn
   ```
4. Run the FastAPI server:
   ```powershell
   uvicorn main:app --reload
   ```

## Frontend (React)

1. Navigate to the frontend folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the React development server:
   ```powershell
   npm start
   ```

The React app will be available at http://localhost:3000 and the FastAPI backend at http://localhost:8000.

## Firebase Setup (Backend)

1. Create a Firebase project at https://console.firebase.google.com/.
2. Enable Firestore in the Firebase Console.
3. Download a service account key (JSON) and place it in the backend directory as `firebase_service_account.json`.
4. Set the environment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of your service account JSON file.
   - Example (Windows):
     ```powershell
     $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\RicSou\OneDrive - Körber AG\Desktop\TechAnchor\backend\firebase_service_account.json"
     ```
5. Install backend dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
6. Remove any old SQLite files (e.g., `users.db`).
7. Start the backend as usual.

See `backend/FIREBASE_MIGRATION_STEPS.md` for a full checklist.
