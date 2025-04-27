# Expense Tracker

A full-stack application to track expenses, built with Node.js, Express, MongoDB, and React.

## Features
- Add, edit, and delete expense records.
- Visualize expenses with a pie chart (category distribution) and bar chart (monthly expenses).
- Responsive and user-friendly interface.
- MongoDB for persistent storage.

## Prerequisites
- Node.js (v16 or higher)   
- MongoDB (local or MongoDB Atlas)
- npm

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file with the following:
    MONGO_URI=mongodb://localhost:27017/expense-tracker
    PORT=5000

4. Start the server:
    npm start

### Frontend
1. Navigate to the frontend directory:
    cd frontend

2. Install dependencies:
    npm install

3. Start the React app:
    npm start

4. Open http://localhost:5173 in your browser.
