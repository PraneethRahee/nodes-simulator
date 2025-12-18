# Node Simulator Client

A React-based visual node editor application built with React Flow for creating and managing pipeline workflows. This application allows users to drag and drop different types of nodes, connect them, and create complex pipelines.

## Project Overview

This is the frontend client for the Node Simulator project, which provides a visual interface for creating and managing node-based pipelines. Users can create various types of nodes (Input, Output, LLM, Email, etc.), connect them to form workflows, and validate the resulting Directed Acyclic Graphs (DAGs).

## Tech Stack

- **React 18.3.1** - Core UI framework with hooks
- **React Flow 11.11.4** - Node-based editor library
- **Vite 7.0.0** - Build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **TypeScript 5.6.3** - Type safety (partial implementation)
- **Lucide React** - Icon library

## Folder Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BaseNode.jsx   # Base component for all nodes
│   │   ├── FlowCanvas.jsx # Main canvas component
│   │   ├── NodePalette.jsx # Node palette sidebar
│   │   ├── CustomEdge.jsx # Custom edge component
│   │   ├── EdgeDeleteButton.jsx # Edge deletion button
│   │   ├── NodeDelete.jsx # Node deletion button
│   │   ├── edgeTypes.jsx  # Edge type definitions
│   │   ├── submit.jsx     # Pipeline submission logic
│   │   └── ui/            # UI components (buttons, cards, etc.)
│   ├── nodes/             # Node type implementations
│   │   ├── InputNode.jsx  # Input node component
│   │   ├── OutputNode.jsx # Output node component
│   │   ├── TextNode.jsx   # Text processing node
│   │   ├── LLMNode.jsx    # Language model node
│   │   ├── EmailNode.jsx  # Email notification node
│   │   ├── LoggerNode.jsx # Logging node
│   │   ├── MathNode.jsx   # Mathematical operations node
│   │   ├── DelayNode.jsx  # Delay node
│   │   ├── ConditionNode.jsx # Conditional logic node
│   │   └── nodeTypes.jsx  # Node type registry
│   ├── hooks/             # Custom React hooks
│   │   └── useNodeHeight.js # Node height calculation hook
│   ├── utils/             # Utility functions
│   │   ├── dagValidation.js # DAG validation logic
│   │   ├── edgeDeletion.js # Edge deletion utilities
│   │   ├── enhancedNodeDeletion.js # Enhanced node deletion
│   │   ├── nodeDeletion.js # Basic node deletion
│   │   └── variableDetection.js # Variable detection logic
│   ├── constants/         # Constants and default values
│   │   ├── nodeDefaults.js # Default node configurations
│   │   ├── nodeStyles.js  # Node styling constants
│   │   └── selectOptions.js # Select dropdown options
│   ├── lib/               # Library utilities
│   │   └── utils.ts       # General utility functions
│   ├── pages/             # Page components
│   │   └── PipelineEditor.jsx # Main pipeline editor page
│   ├── App.jsx            # Root application component
│   ├── main.jsx           # Application entry point
│   ├── App.css            # Application styles
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## State Management

The application uses a combination of local component state and prop drilling for state management:

- **Local State**: Individual node components manage their own state using `useState`
- **Prop Drilling**: State is passed down from `PipelineEditor` to `FlowCanvas` and individual nodes
- **Event Communication**: Document-level events are used for cross-component communication

### Current State Flow

1. `PipelineEditor` maintains the main `nodes` and `edges` state
2. State is passed to `FlowCanvas` as props
3. `FlowCanvas` handles node/edge operations and updates state
4. Individual nodes manage their internal state (form inputs, etc.)
5. Document events are used for node/edge deletion

## Component Communication

Components communicate through several mechanisms:

1. **Props**: Parent to child data flow
2. **Callbacks**: Child to parent communication
3. **Document Events**: Cross-component communication for deletion operations
4. **React Flow Events**: Built-in React Flow event handlers

## Performance Considerations

### Current Performance Issues

1. **Unnecessary Re-renders**: Components re-render when unrelated state changes
2. **Inline Functions**: Inline event handlers created on every render
3. **State Lifting**: Excessive state lifting causing cascade re-renders
4. **Document Events**: Global event listeners causing performance overhead
5. **Large Components**: Monolithic components that are hard to optimize

### Implemented Optimizations

1. **React.memo**: Applied to prevent unnecessary re-renders
2. **useCallback**: Memoized event handlers to prevent function recreation
3. **useMemo**: Memoized expensive calculations
4. **Component Splitting**: Broken down large components into smaller ones
5. **Context API**: Implemented for better state management
6. **Lazy Loading**: Components are loaded on-demand

## How to Run Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Performance Optimization Guide

This section documents the performance optimizations implemented in this project.

### 1. Component Memoization

All node components are wrapped with `React.memo` to prevent unnecessary re-renders:

```javascript
const InputNode = React.memo(({ id, data, isConnectable }) => {
  // Component implementation
});
```

### 2. Event Handler Optimization

Event handlers are memoized using `useCallback` to prevent function recreation:

```javascript
const handleInputChange = useCallback((field, value) => {
  // Handler logic
}, [id]);
```

### 3. Derived State Memoization

Expensive calculations are memoized using `useMemo`:

```javascript
const nodeColorMap = useMemo(() => ({
  input: '#3b82f6',
  output: '#10b981',
  // ... other colors
}), []);
```

### 4. Context-Based State Management

Implemented a context-based state management system to reduce prop drilling:

```javascript
const PipelineContext = createContext();
```

### 5. Component Splitting

Large components have been split into smaller, focused components:

- `FlowCanvas` split into `FlowRenderer` and `FlowControls`
- Node components split into `BaseNode` and specific node types
- UI components extracted to reusable components

## Development Guidelines

### Code Style

- Use functional components with hooks
- Apply `React.memo` to components that receive props
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Avoid inline functions in JSX
- Use proper TypeScript types where applicable

### Performance Best Practices

- Profile components using React DevTools
- Monitor re-renders using React DevTools Profiler
- Keep component state local when possible
- Avoid unnecessary state lifting
- Use keys properly in lists
- Implement proper cleanup in useEffect

### Testing

- Test component re-render behavior
- Benchmark critical paths
- Add performance regression tests

## Future Improvements

1. **Complete TypeScript Migration**: Migrate all components to TypeScript
2. **State Management Library**: Consider Redux Toolkit or Zustand for complex state
3. **Virtualization**: Implement virtualization for large node counts
4. **Web Workers**: Offload heavy computations to web workers
5. **Caching**: Implement intelligent caching for node configurations

## Contributing

When contributing to this project:

1. Follow the existing code style
2. Add performance considerations for new components
3. Test performance impact of changes
4. Document performance optimizations
5. Use appropriate memoization strategies

## License

This project is part of the Node Simulator application. Please refer to the main project license.
