# Docker Setup for TechAnchor

This project can be run using Docker containers for both development and production environments.

## Prerequisites

- Docker
- Docker Compose
- Firebase service account JSON file (`backend/firebase_service_account.json`)

## Development Environment

### Running with Docker Compose

1. **Clone the repository and navigate to the project root**
2. **Ensure you have the Firebase credentials file**:
   - Place your `firebase_service_account.json` file in the `backend/` directory

3. **Start the development environment**:
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build and start the FastAPI backend on `http://localhost:8000`
   - Build and start the React frontend on `http://localhost:3000`
   - Set up networking between containers
   - Enable hot-reloading for both frontend and backend

4. **Stop the services**:
   ```bash
   docker-compose down
   ```

### Individual Container Commands

**Backend only**:
```bash
cd backend
docker build -t techanchor-backend .
docker run -p 8000:8000 -v $(pwd):/app techanchor-backend
```

**Frontend only**:
```bash
cd frontend
docker build -t techanchor-frontend .
docker run -p 3000:3000 -v $(pwd):/app techanchor-frontend
```

## Production Environment

For production deployment with optimized builds:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

This will:
- Build and serve the React app with nginx on `http://localhost`
- Run the FastAPI backend on `http://localhost:8000`
- Use production-optimized settings

## Configuration

### Environment Variables

**Backend (.env file in backend/)**:
- `JWT_SECRET`: Secret key for JWT token signing
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to Firebase service account JSON

**Frontend**:
- `REACT_APP_API_URL`: Backend API URL (automatically configured)

### Docker Volumes

- Backend uploads are persisted in `./backend/uploads`
- Frontend and backend code are mounted for development hot-reloading
- Node modules are cached in anonymous volumes for performance

## File Structure

```
TechAnchor/
├── docker-compose.yml          # Development configuration
├── docker-compose.prod.yml     # Production configuration
├── backend/
│   ├── Dockerfile             # Backend container config
│   ├── .dockerignore          # Files to exclude from build
│   ├── requirements.txt       # Python dependencies
│   └── firebase_service_account.json  # Firebase credentials (add this)
└── frontend/
    ├── Dockerfile             # Development container config
    ├── Dockerfile.prod        # Production container config
    ├── .dockerignore          # Files to exclude from build
    ├── nginx.conf             # Nginx config for production
    └── src/config.js          # API configuration
```

## Networking

- Backend container: `backend` (internal), `localhost:8000` (external)
- Frontend container: `frontend` (internal), `localhost:3000` (external)
- Both containers communicate over the `techanchor-network` bridge network

## Troubleshooting

1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Firebase errors**: Verify `firebase_service_account.json` exists in `backend/`
3. **Permission issues**: On Linux/Mac, ensure proper file permissions
4. **Build failures**: Clear Docker cache with `docker system prune`

## Development Workflow

1. Make code changes in your IDE
2. Changes are automatically reflected in containers (hot-reload enabled)
3. Backend changes restart the FastAPI server
4. Frontend changes trigger React's development server rebuild
5. Database/Firebase changes persist across container restarts