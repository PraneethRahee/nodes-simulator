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
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      if (typeof action.payload === 'function') {
        state.nodes = action.payload(state.nodes);
      } else {
        state.nodes = action.payload;
      }
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
  },
});

export const {
  setNodes,
  addNode,
  updateNode,
  deleteNode,
  setSelectedNode,
} = nodesSlice.actions;

export default nodesSlice.reducer;