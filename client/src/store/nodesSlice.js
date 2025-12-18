import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Input Node' },
    },
  ],
  selectedNode: null,
  isLoading: false,
  error: null,
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const { id, updates } = action.payload;
      const node = state.nodes.find(node => node.id === id);
      if (node) {
        Object.assign(node, updates);
      }
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter(node => node.id !== nodeId);
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setNodes,
  addNode,
  updateNode,
  deleteNode,
  deleteNodeWithEdges,
  setSelectedNode,
  setLoading,
  setError,
  clearError,
} = nodesSlice.actions;

export default nodesSlice.reducer;