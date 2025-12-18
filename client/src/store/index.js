import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './nodesSlice';
import edgesReducer from './edgesSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export * from './nodesSlice';
export * from './edgesSlice';
export * from './uiSlice';
export * from './selectors';

export default store;