# 🚄 Deploy TechAnchor to Railway

Complete guide to deploy your TechAnchor application on Railway for free!

## 📋 Prerequisites

1. **GitHub account** (to connect your repository)
2. **Railway account** - Sign up at [railway.app](https://railway.app)
3. **Firebase service account JSON** file

## 🚀 Quick Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add Railway configuration"
   git push origin main
   ```

### Step 2: Deploy on Railway

1. **Go to [railway.app](https://railway.app)** and sign in with GitHub
2. **Create New Project** → **Deploy from GitHub repo**
3. **Select your TechAnchor repository**
4. Railway will detect your project and create 2 services automatically:
   - **Backend** (from `/backend/Dockerfile`)
   - **Frontend** (from `/frontend/Dockerfile`)

### Step 3: Configure Environment Variables

**Backend Service:**
1. Click on your **backend service**
2. Go to **Variables** tab
3. Add these variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `JWT_SECRET` | `your-secure-jwt-secret-here` | Strong random string |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/app/firebase_creds.json` | Path to Firebase creds |
| `FIREBASE_CREDENTIALS_JSON` | `{your-firebase-json-content}` | Firebase service account JSON |
| `ALLOWED_ORIGINS` | `https://your-frontend-url.railway.app` | Frontend URL (add after frontend deploys) |
| `PORT` | `8000` | Backend port |

**Frontend Service:**
1. Click on your **frontend service**
2. Go to **Variables** tab
3. Add these variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-backend-url.railway.app` | Backend URL (add after backend deploys) |
| `PORT` | `3000` | Frontend port |

### Step 4: Setup Firebase Credentials

Add this to your `backend/Dockerfile` before the `CMD` line:
```dockerfile
# Create Firebase credentials file from environment variable
RUN echo '$FIREBASE_CREDENTIALS_JSON' > /app/firebase_creds.json
```

Or update your backend code to handle JSON from environment variable:

```python
# In main.py, update Firebase initialization:
FIREBASE_CRED_PATH = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "backend/firebase_service_account.json")

# Check if credentials are provided as JSON string in environment
firebase_creds_json = os.environ.get("FIREBASE_CREDENTIALS_JSON")
if firebase_creds_json:
    import json
    cred_dict = json.loads(firebase_creds_json)
    cred = credentials.Certificate(cred_dict)
else:
    cred = credentials.Certificate(FIREBASE_CRED_PATH)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
```

### Step 5: Get Your URLs

After deployment:
1. **Backend URL**: `https://your-backend-name.railway.app`
2. **Frontend URL**: `https://your-frontend-name.railway.app`

### Step 6: Update URLs

1. **Update Backend CORS**: Add your frontend URL to `ALLOWED_ORIGINS`
2. **Update Frontend API**: Add your backend URL to `REACT_APP_API_URL`
3. **Redeploy** both services

## 🔧 Advanced Configuration

### Custom Domains (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update CORS and API URLs accordingly

### Database (Optional)
If you want to add PostgreSQL:
1. **Add Database** → **PostgreSQL**
2. Railway provides connection string automatically
3. Update your app to use PostgreSQL instead of/alongside Firestore

### File Storage
Railway has ephemeral storage. For persistent file uploads, consider:
- **Firebase Storage** (recommended)
- **AWS S3**
- **Railway Volumes** (paid feature)

## 🏗️ Project Structure for Railway

```
TechAnchor/
├── backend/
│   ├── Dockerfile
│   ├── railway.toml
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── Dockerfile
│   ├── railway.toml
│   ├── package.json
│   └── src/
└── README.md
```

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update `ALLOWED_ORIGINS` with your frontend URL
2. **Firebase Errors**: Ensure `FIREBASE_CREDENTIALS_JSON` is properly formatted
3. **Build Failures**: Check Railway logs in the deployments tab
4. **404 Errors**: Verify your environment variables are set correctly

### Check Logs:
- Click on deployment → **View Logs**
- Monitor both build and runtime logs

### Redeploy:
- Click **Deploy** → **Redeploy**
- Or push new commits to trigger auto-deployment

## 💰 Railway Free Tier

- **$5 in credits per month** (usually enough for small apps)
- **500GB outbound bandwidth**
- **Automatic HTTPS**
- **Custom domains**
- **GitHub integration**

## 🚀 One-Click Setup Script

Create this script to automate environment variable setup:

```bash
#!/bin/bash
# deploy-to-railway.sh

echo "🚄 Setting up Railway deployment..."

# Install Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login to Railway
railway login

# Create new project
railway new

# Deploy backend
cd backend
railway up

# Deploy frontend  
cd ../frontend
railway up

echo "✅ Deployment complete! Check Railway dashboard for URLs."
```

## 📝 Next Steps

1. **Deploy and test** your application
2. **Set up monitoring** in Railway dashboard
3. **Configure custom domain** if needed
4. **Set up CI/CD** for automatic deployments
5. **Monitor usage** to stay within free tier

Your TechAnchor app will be live at your Railway URLs! 🎉