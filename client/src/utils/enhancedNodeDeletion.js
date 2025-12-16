/**
 * Enhanced utility functions for node deletion from the graph
 */

/**
 * Delete a node from the graph by its ID with enhanced error handling and validation
 * @param {Array} nodes - Current nodes array
 * @param {Function} setNodes - Function to update nodes state
 * @param {Function} setEdges - Function to update edges state
 * @param {string} nodeId - ID of the node to delete
 * @param {Array} edges - Current edges array
 * @param {Function} callback - Optional callback function after deletion
 * @returns {boolean} - Success status of the deletion
 */
export const deleteNodeById = (nodes, setNodes, setEdges, nodeId, edges, callback) => {
  console.log(`Deleting node with ID: ${nodeId}`);
  
  // Validate inputs
  if (!nodes || !Array.isArray(nodes)) {
    console.error('Invalid nodes array provided');
    return false;
  }
  
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return false;
  }
  
  if (!nodeId) {
    console.error('Node ID is required for deletion');
    return false;
  }
  
  // Find the node to delete
  const nodeToDelete = nodes.find(node => node.id === nodeId);
  
  if (!nodeToDelete) {
    console.error(`Node with ID ${nodeId} not found`);
    return false;
  }

  // Count connected edges before deletion
  const connectedEdges = edges.filter(edge => 
    edge.source === nodeId || edge.target === nodeId
  );
  
  console.log(`Found ${connectedEdges.length} edges connected to node ${nodeId}`);

  // Remove the node from the nodes array
  const updatedNodes = nodes.filter(node => node.id !== nodeId);
  setNodes(updatedNodes);

  // Remove all edges connected to this node
  const updatedEdges = edges.filter(edge =>
    edge.source !== nodeId && edge.target !== nodeId
  );
  setEdges(updatedEdges);

  console.log(`Node ${nodeId} and ${connectedEdges.length} connected edges deleted successfully`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback({
      nodeId,
      deletedNode: nodeToDelete,
      deletedEdges: connectedEdges,
      remainingNodes: updatedNodes,
      remainingEdges: updatedEdges
    });
  }
  
  return true;
};

/**
 * Delete multiple nodes from the graph by their IDs
 * @param {Array} nodes - Current nodes array
 * @param {Function} setNodes - Function to update nodes state
 * @param {Function} setEdges - Function to update edges state
 * @param {Array} nodeIds - Array of node IDs to delete
 * @param {Array} edges - Current edges array
 * @param {Function} callback - Optional callback function after deletion
 * @returns {Object} - Deletion results with success status and details
 */
export const deleteMultipleNodes = (nodes, setNodes, setEdges, nodeIds, edges, callback) => {
  console.log(`Deleting ${nodeIds.length} nodes: ${nodeIds.join(', ')}`);
  
  // Validate inputs
  if (!nodes || !Array.isArray(nodes)) {
    console.error('Invalid nodes array provided');
    return { success: false, error: 'Invalid nodes array' };
  }
  
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return { success: false, error: 'Invalid edges array' };
  }
  
  if (!nodeIds || !Array.isArray(nodeIds) || nodeIds.length === 0) {
    console.error('Valid node IDs array is required for deletion');
    return { success: false, error: 'Invalid node IDs array' };
  }

  // Find nodes to delete
  const nodesToDelete = nodes.filter(node => nodeIds.includes(node.id));
  const deletedNodeIds = nodesToDelete.map(node => node.id);
  const notFoundIds = nodeIds.filter(id => !deletedNodeIds.includes(id));
  
  if (notFoundIds.length > 0) {
    console.warn(`Nodes with IDs ${notFoundIds.join(', ')} not found`);
  }
  
  if (nodesToDelete.length === 0) {
    console.error('No valid nodes found for deletion');
    return { success: false, error: 'No valid nodes found' };
  }

  // Count connected edges before deletion
  const connectedEdges = edges.filter(edge => 
    deletedNodeIds.includes(edge.source) || deletedNodeIds.includes(edge.target)
  );
  
  console.log(`Found ${connectedEdges.length} edges connected to the nodes being deleted`);

  // Remove the nodes from the nodes array
  const updatedNodes = nodes.filter(node => !deletedNodeIds.includes(node.id));
  setNodes(updatedNodes);

  // Remove all edges connected to these nodes
  const updatedEdges = edges.filter(edge =>
    !deletedNodeIds.includes(edge.source) && !deletedNodeIds.includes(edge.target)
  );
  setEdges(updatedEdges);

  const result = {
    success: true,
    deletedNodes: nodesToDelete,
    deletedEdges: connectedEdges,
    remainingNodes: updatedNodes,
    remainingEdges: updatedEdges,
    notFoundIds
  };

  console.log(`Successfully deleted ${nodesToDelete.length} nodes and ${connectedEdges.length} connected edges`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback(result);
  }
  
  return result;
};

/**
 * Async version of deleteNodeById
 * @param {Array} nodes - Current nodes array
 * @param {Function} setNodes - Function to update nodes state
 * @param {Function} setEdges - Function to update edges state
 * @param {string} nodeId - ID of the node to delete
 * @param {Array} edges - Current edges array
 * @param {Function} callback - Optional callback function after deletion
 * @returns {Promise<boolean>} - Success status of the deletion
 */
export const deleteNodeByIdAsync = async (nodes, setNodes, setEdges, nodeId, edges, callback) => {
  return new Promise((resolve) => {
    // Simulate async operation
    setTimeout(() => {
      const result = deleteNodeById(nodes, setNodes, setEdges, nodeId, edges, callback);
      resolve(result);
    }, 0);
  });
};

/**
 * Validate if a node can be safely deleted (not breaking critical paths)
 * @param {Array} nodes - Current nodes array
 * @param {Array} edges - Current edges array
 * @param {string} nodeId - ID of the node to validate
 * @returns {Object} - Validation result with canDelete flag and warnings
 */
export const validateNodeDeletion = (nodes, edges, nodeId) => {
  // Find the node
  const node = nodes.find(n => n.id === nodeId);
  if (!node) {
    return { canDelete: false, error: 'Node not found' };
  }

  // Find connected edges
  const incomingEdges = edges.filter(e => e.target === nodeId);
  const outgoingEdges = edges.filter(e => e.source === nodeId);
  
  const warnings = [];
  
  // Check if node has critical connections
  if (incomingEdges.length > 0 && outgoingEdges.length > 0) {
    warnings.push(`Node is part of a critical path with ${incomingEdges.length} inputs and ${outgoingEdges.length} outputs`);
  }
  
  // Check for special node types that might require special handling
  if (node.type === 'input' && outgoingEdges.length > 0) {
    warnings.push('Deleting an input node will remove all downstream connections');
  }
  
  if (node.type === 'output' && incomingEdges.length > 0) {
    warnings.push('Deleting an output node will remove all upstream connections');
  }

  return {
    canDelete: true,
    node,
    incomingEdges,
    outgoingEdges,
    warnings
  };
};