# Frontend Assignment

This project consists of a React frontend with a FastAPI backend for a pipeline editor application.

## Project Structure

```
frontendassign/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── BaseNode.jsx     # Base component for all nodes
│   │   │   ├── FlowCanvas.jsx   # Main canvas for pipeline editing
│   │   │   ├── NodePalette.jsx   # Sidebar with available nodes
│   │   │   ├── submit.jsx        # API submission logic
│   │   │   └── ui/              # UI components (only used ones)
│   │   ├── nodes/          # Node type components
│   │   │   ├── InputNode.jsx
│   │   │   ├── OutputNode.jsx
│   │   │   ├── TextNode.jsx
│   │   │   ├── LLMNode.jsx
│   │   │   ├── EmailNode.jsx
│   │   │   ├── LoggerNode.jsx
│   │   │   ├── MathNode.jsx
│   │   │   ├── DelayNode.jsx
│   │   │   ├── ConditionNode.jsx
│   │   │   └── nodeTypes.jsx    # Node type registry
│   │   ├── pages/          # Page components
│   │   │   └── PipelineEditor.jsx
│   │   ├── utils/          # Utility functions
│   │   │   ├── dagValidation.js
│   │   │   └── variableDetection.js
│   │   ├── lib/           # Library utilities
│   │   │   └── utils.ts
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Application entry point
│   ├── package.json
│   └── package-lock.json
├── server/          # FastAPI backend application
│   ├── main.py          # Main FastAPI application
│   └── requirements.txt  # Python dependencies
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

## Cleanup Performed

This project has been cleaned up to remove unnecessary dependencies and unused files:

### Removed Packages
- Removed over 255 unnecessary npm packages including database libraries, authentication systems, and unused UI components
- Kept only essential packages: React, ReactFlow, Radix UI components (used ones), Tailwind CSS, and Lucide icons

### Removed Files
- Unused UI component files (accordion, avatar, breadcrumb, calendar, carousel, etc.)
- Unused hooks (use-mobile.tsx, use-toast.ts)
- Unused utility files (queryClient.ts)
- Unused pages (not-found.tsx)
- Unused configuration files (babel.json)
- Commented-out PropertiesPanel component and related code

### Current Dependencies
**Frontend:**
- React 18.3.1
- ReactFlow 11.11.4
- Radix UI components (alert-dialog, button, card, checkbox, input, label, select, switch, textarea, toast, tooltip)
- Tailwind CSS 3.4.17
- Lucide React icons
- Vite for development

**Backend:**
- FastAPI 0.104.1
- Uvicorn 0.24.0

## Development Notes

- The backend uses CORS middleware to allow requests from any origin
- The frontend uses React Flow for creating visual pipeline representations
- The project includes essential UI components built with Radix UI and styled with Tailwind CSS