# Frontend Assignment

This project consists of a React frontend with a FastAPI backend for a pipeline editor application.

## Project Structure

```
frontendassign/
├── client/          # React frontend application
├── server/          # FastAPI backend application
└── README.md        # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Python (v3.7 or higher)
- pip

## Backend Setup and Running

The backend is built with FastAPI and provides API endpoints for pipeline validation.

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install the required dependencies:**
   ```bash
   pip install fastapi uvicorn
   ```

4. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```

   The server will start on `http://localhost:8000` by default.

5. **Access the API documentation:**
   Once the server is running, you can access the interactive API documentation at:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## Frontend Setup and Running

The frontend is built with React, Vite, and includes various UI components using Tailwind CSS and Radix UI.

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173` by default.

## Running Both Frontend and Backend Together

To run both applications simultaneously:

1. **Open two separate terminal windows**

2. **In the first terminal (Backend):**
   ```bash
   cd server
   python -m venv venv
   venv\Scripts\activate  # On Windows
   pip install fastapi uvicorn
   uvicorn main:app --reload
   ```

3. **In the second terminal (Frontend):**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

## API Endpoints

### POST /pipelines/parse

Validates a pipeline structure and determines if it forms a valid Directed Acyclic Graph (DAG).

**Request Body:**
```json
{
  "nodes": ["node1", "node2", "node3"],
  "edges": [
    {"source": "node1", "target": "node2"},
    {"source": "node2", "target": "node3"}
  ]
}
```

**Response:**
```json
{
  "nodeCount": 3,
  "edgeCount": 2,
  "isValidDAG": true
}
```

## Troubleshooting

### Backend Issues

1. **Port already in use:**
   - Change the port by adding `--port 8001` to the uvicorn command
   - Example: `uvicorn main:app --reload --port 8001`

2. **Module not found errors:**
   - Ensure you've activated the virtual environment
   - Check that all dependencies are installed correctly

### Frontend Issues

1. **Port already in use:**
   - Vite will automatically suggest an alternative port
   - Or specify a port: `npm run dev -- --port 3000`

2. **Dependency installation errors:**
   - Try clearing the npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then run `npm install` again

## Development Notes

- The backend uses CORS middleware to allow requests from any origin
- The frontend uses React Flow for creating visual pipeline representations
- The project includes various UI components built with Radix UI and styled with Tailwind CSS