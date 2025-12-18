import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

// Initial state for the pipeline
const initialState = {
  nodes: [
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Input Node' },
    },
  ],
  edges: [],
  selectedNode: null,
  isLoading: false,
  error: null,
};

// Action types for state management
const ACTION_TYPES = {
  SET_NODES: 'SET_NODES',
  SET_EDGES: 'SET_EDGES',
  ADD_NODE: 'ADD_NODE',
  UPDATE_NODE: 'UPDATE_NODE',
  DELETE_NODE: 'DELETE_NODE',
  ADD_EDGE: 'ADD_EDGE',
  DELETE_EDGE: 'DELETE_EDGE',
  SET_SELECTED_NODE: 'SET_SELECTED_NODE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function to handle state changes
const pipelineReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NODES:
      return {
        ...state,
        nodes: action.payload,
      };

    case ACTION_TYPES.SET_EDGES:
      return {
        ...state,
        edges: action.payload,
      };

    case ACTION_TYPES.ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
      };

    case ACTION_TYPES.UPDATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload.id
            ? { ...node, ...action.payload.updates }
            : node
        ),
      };

    case ACTION_TYPES.DELETE_NODE:
      return {
        ...state,
        nodes: state.nodes.filter(node => node.id !== action.payload),
        edges: state.edges.filter(
          edge => edge.source !== action.payload && edge.target !== action.payload
        ),
      };

    case 'DELETE_CONNECTED_EDGES':
      return {
        ...state,
        edges: state.edges.filter(
          edge => edge.source !== action.payload && edge.target !== action.payload
        ),
      };

    case ACTION_TYPES.ADD_EDGE:
      return {
        ...state,
        edges: [...state.edges, action.payload],
      };

    case ACTION_TYPES.DELETE_EDGE:
      return {
        ...state,
        edges: state.edges.filter(edge => edge.id !== action.payload),
      };

    case ACTION_TYPES.SET_SELECTED_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create the context
const PipelineContext = createContext();

// Provider component
export const PipelineProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pipelineReducer, initialState);

  // Memoized actions to prevent unnecessary re-renders
  const setNodes = useCallback((nodes) => {
    dispatch({ type: ACTION_TYPES.SET_NODES, payload: nodes });
  }, []);

  const setEdges = useCallback((edges) => {
    dispatch({ type: ACTION_TYPES.SET_EDGES, payload: edges });
  }, []);

  const addNode = useCallback((node) => {
    dispatch({ type: ACTION_TYPES.ADD_NODE, payload: node });
  }, []);

  const updateNode = useCallback((id, updates) => {
    dispatch({ type: ACTION_TYPES.UPDATE_NODE, payload: { id, updates } });
  }, []);

  const deleteNode = useCallback((id) => {
    dispatch({ type: ACTION_TYPES.DELETE_NODE, payload: id });
  }, []);

  const deleteNodeWithEdges = useCallback((nodeId) => {
    // First dispatch the node deletion
    dispatch({ type: ACTION_TYPES.DELETE_NODE, payload: nodeId });
    
    // Then dispatch edge deletions for all connected edges
    dispatch({ type: 'DELETE_CONNECTED_EDGES', payload: nodeId });
  }, []);

  const addEdge = useCallback((edge) => {
    dispatch({ type: ACTION_TYPES.ADD_EDGE, payload: edge });
  }, []);

  const deleteEdge = useCallback((id) => {
    dispatch({ type: ACTION_TYPES.DELETE_EDGE, payload: id });
  }, []);

  const setSelectedNode = useCallback((node) => {
    dispatch({ type: ACTION_TYPES.SET_SELECTED_NODE, payload: node });
  }, []);

  const setLoading = useCallback((isLoading) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, payload: isLoading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  }, []);

  // Memoized actions object
  const actions = useMemo(() => ({
    setNodes,
    setEdges,
    addNode,
    updateNode,
    deleteNode,
    deleteNodeWithEdges,
    addEdge,
    deleteEdge,
    setSelectedNode,
    setLoading,
    setError,
    clearError,
  }), [
    setNodes,
    setEdges,
    addNode,
    updateNode,
    deleteNode,
    deleteNodeWithEdges,
    addEdge,
    deleteEdge,
    setSelectedNode,
    setLoading,
    setError,
    clearError,
  ]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    ...state,
    ...actions,
  }), [state, actions]);

  return (
    <PipelineContext.Provider value={contextValue}>
      {children}
    </PipelineContext.Provider>
  );
};

// Custom hook to use the pipeline context
export const usePipeline = () => {
  const context = useContext(PipelineContext);
  
  if (!context) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  
  return context;
};

// Export action types for external use
export { ACTION_TYPES };