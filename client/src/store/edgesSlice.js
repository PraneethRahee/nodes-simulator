import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  edges: [],
};

const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    setEdges: (state, action) => {
      if (typeof action.payload === 'function') {
        state.edges = action.payload(state.edges);
      } else {
        state.edges = action.payload;
      }
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
    deleteEdge: (state, action) => {
      const edgeId = action.payload;
      state.edges = state.edges.filter(edge => edge.id !== edgeId);
    },
    deleteEdgesForNode: (state, action) => {
      const nodeId = action.payload;
      state.edges = state.edges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      );
    },
  },
});

export const {
  setEdges,
  addEdge,
  deleteEdge,
  deleteEdgesForNode,
} = edgesSlice.actions;

export default edgesSlice.reducer;