@echo off
REM Script to start the backend using uvicorn from the main folder
cd backend
python -m uvicorn main:app --reload
