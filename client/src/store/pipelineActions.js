import { deleteNodeWithEdges } from './nodesSlice';
import { deleteEdgesForNode } from './edgesSlice';

// Thunk action for deleting a node and its connected edges
export const deleteNodeWithConnectedEdges = (nodeId) => (dispatch) => {
  // First delete the node
  dispatch(deleteNodeWithEdges(nodeId));
  
  // Then delete all connected edges
  dispatch(deleteEdgesForNode(nodeId));
};