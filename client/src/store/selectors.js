import { createSelector } from '@reduxjs/toolkit';

export const selectNodes = (state) => state.nodes.nodes;
export const selectEdges = (state) => state.edges.edges;
export const selectSelectedNode = (state) => state.nodes.selectedNode;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectError = (state) => state.ui.error;
export const selectAlertState = (state) => state.ui.alertState;

export const selectNodesCount = createSelector(
  [selectNodes],
  (nodes) => nodes.length
);

export const selectEdgesCount = createSelector(
  [selectEdges],
  (edges) => edges.length
);

export const selectNodeById = (nodeId) => createSelector(
  [selectNodes],
  (nodes) => nodes.find(node => node.id === nodeId)
);

export const selectEdgesForNode = (nodeId) => createSelector(
  [selectEdges],
  (edges) => edges.filter(edge => edge.source === nodeId || edge.target === nodeId)
);

export const selectConnectedNodeIds = createSelector(
  [selectEdges],
  (edges) => {
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    return connectedNodeIds;
  }
);

export const selectConnectedNodes = createSelector(
  [selectNodes, selectConnectedNodeIds],
  (nodes, connectedNodeIds) => {
    return nodes.filter(node => connectedNodeIds.has(node.id));
  }
);

export const selectIsAlertShowing = createSelector(
  [selectAlertState],
  (alertState) => alertState.show
);

export const selectAlertData = createSelector(
  [selectAlertState],
  (alertState) => alertState.data
);