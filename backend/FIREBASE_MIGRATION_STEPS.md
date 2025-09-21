# Firebase Migration Manual Steps

1. **Create a Firebase Project**
   - Go to https://console.firebase.google.com/ and create a new project.

2. **Enable Firestore**
   - In the Firebase Console, go to Firestore Database and click "Create database".

3. **Download Service Account Key**
   - In Project Settings > Service Accounts, click "Generate new private key" and download the JSON file.
   - Place this file in your backend directory (e.g., `backend/firebase_service_account.json`).

4. **Set Environment Variable**
   - Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of your service account JSON file.
   - Example (Windows):
     ```powershell
     $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\RicSou\OneDrive - Körber AG\Desktop\TechAnchor\backend\firebase_service_account.json"
     ```

5. **Update Firestore Security Rules**
   - In the Firebase Console, configure Firestore rules to secure your data as needed.

6. **Install Python Dependencies**
   - In the backend directory, run:
     ```powershell
     pip install -r requirements.txt
     ```

7. **Remove Old SQLite Files**
   - You can delete `users.db` and any SQLite-related scripts if you wish.

8. **Test the Backend**
   - Start your backend and test all endpoints (register, login, case creation, etc.).

9. **Update Frontend (if needed)**
   - If any API responses or IDs have changed, update the frontend accordingly.

10. **(Optional) Enable Firebase Authentication**
    - If you want to use Firebase Auth, enable it in the Firebase Console and update backend logic as needed.

---

See README.md for more details.
