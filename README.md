# Taskly - MERN Stack Todo Application

A modern todo application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Persistent storage with MongoDB
- Modern React frontend
- RESTful API backend

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskly
   ```

4. Start MongoDB locally or update the MONGODB_URI to point to your MongoDB Atlas cluster

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and the frontend development server (port 3000).

## Project Structure

- `backend/` - Express.js server and MongoDB models
- `frontend/` - React application
- `package.json` - Root project configuration
- `.env` - Environment variables

## API Endpoints

- GET `/api/todos` - Get all todos
- POST `/api/todos` - Create a new todo
- PUT `/api/todos/:id` - Toggle todo completion
- DELETE `/api/todos/:id` - Delete a todo