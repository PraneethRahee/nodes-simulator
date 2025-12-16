/**
 * Utility functions for node deletion from the graph
 */

/**
 * Delete a node from the graph by its ID
 * @param {Array} nodes - Current nodes array
 * @param {Function} setNodes - Function to update nodes state
 * @param {Function} setEdges - Function to update edges state
 * @param {string} nodeId - ID of the node to delete
 */
export const deleteNodeById = (nodes, setNodes, setEdges, nodeId, edges) => {
  console.log(`Deleting node with ID: ${nodeId}`);
  
  // Find the node to delete
  const nodeToDelete = nodes.find(node => node.id === nodeId);
  
  if (!nodeToDelete) {
    console.error(`Node with ID ${nodeId} not found`);
    return false;
  }

  // Remove the node from the nodes array
  const updatedNodes = nodes.filter(node => node.id !== nodeId);
  setNodes(updatedNodes);

  // Remove all edges connected to this node
  const updatedEdges = edges.filter(edge =>
    edge.source !== nodeId && edge.target !== nodeId
  );
  setEdges(updatedEdges);

  console.log(`Node ${nodeId} deleted successfully`);
  return true;
};

/**
 * Delete a node from the graph by its ID (async version)
 * @param {Array} nodes - Current nodes array
 * @param {Function} setNodes - Function to update nodes state
 * @param {Function} setEdges - Function to update edges state
 * @param {string} nodeId - ID of the node to delete
 */
export const deleteNodeByIdAsync = async (nodes, setNodes, setEdges, nodeId, edges) => {
  console.log(`Deleting node with ID: ${nodeId}`);
  
  // Find the node to delete
  const nodeToDelete = nodes.find(node => node.id === nodeId);
  
  if (!nodeToDelete) {
    console.error(`Node with ID ${nodeId} not found`);
    return false;
  }

  // Remove the node from the nodes array
  const updatedNodes = nodes.filter(node => node.id !== nodeId);
  setNodes(updatedNodes);

  // Remove all edges connected to this node
  const updatedEdges = edges.filter(edge =>
    edge.source !== nodeId && edge.target !== nodeId
  );
  setEdges(updatedEdges);

  console.log(`Node ${nodeId} deleted successfully`);
  return true;
};