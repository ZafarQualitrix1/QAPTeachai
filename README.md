# Full-Stack React Application

This project consists of a React frontend and a Node.js Express backend, designed for deployment on Vercel and Railway respectively.

## Project Structure

- `frontend/` (root): React application built with Vite
- `backend/`: Node.js Express server with MySQL integration

## Frontend (Deploy to Vercel)

1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Vercel will automatically detect and build the React app.

## Backend (Deploy to Railway)

1. In the Railway dashboard, create a new project.
2. Connect your GitHub repository.
3. Add a MySQL database plugin in Railway.
4. Set the environment variables in Railway: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` to the values provided by Railway's MySQL database.
5. Deploy the backend.

## Environment Variables

- Backend: Update `backend/.env` with the actual MySQL credentials for local development.

## Running Locally

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

Ensure MySQL server is running locally and the database exists.

## Dummy Page

The frontend currently displays a dummy page. Replace `src/App.jsx` with your actual application components after successful launch.
