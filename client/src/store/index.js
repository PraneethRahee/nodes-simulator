import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './nodesSlice';
import edgesReducer from './edgesSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;