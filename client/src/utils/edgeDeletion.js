/**
 * Utility functions for edge deletion from the graph
 */

/**
 * Delete an edge from the graph by its ID
 * @param {Array} edges - Current edges array
 * @param {Function} setEdges - Function to update edges state
 * @param {string} edgeId - ID of the edge to delete
 * @param {Function} callback - Optional callback function after deletion
 * @returns {boolean} - Success status of the deletion
 */
export const deleteEdgeById = (edges, setEdges, edgeId, callback) => {
  console.log(`Deleting edge with ID: ${edgeId}`);
  
  // Validate inputs
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return false;
  }
  
  if (!edgeId) {
    console.error('Edge ID is required for deletion');
    return false;
  }
  
  // Find the edge to delete
  const edgeToDelete = edges.find(edge => edge.id === edgeId);
  
  if (!edgeToDelete) {
    console.error(`Edge with ID ${edgeId} not found`);
    return false;
  }

  // Remove the edge from the edges array
  const updatedEdges = edges.filter(edge => edge.id !== edgeId);
  setEdges(updatedEdges);

  console.log(`Edge ${edgeId} deleted successfully`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback({
      edgeId,
      deletedEdge: edgeToDelete,
      remainingEdges: updatedEdges
    });
  }
  
  return true;
};

/**
 * Delete an edge by its source and target nodes
 * @param {Array} edges - Current edges array
 * @param {Function} setEdges - Function to update edges state
 * @param {string} sourceId - ID of the source node
 * @param {string} targetId - ID of the target node
 * @param {Function} callback - Optional callback function after deletion
 * @returns {boolean} - Success status of the deletion
 */
export const deleteEdgeByNodes = (edges, setEdges, sourceId, targetId, callback) => {
  console.log(`Deleting edge from ${sourceId} to ${targetId}`);
  
  // Validate inputs
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return false;
  }
  
  if (!sourceId || !targetId) {
    console.error('Source and target node IDs are required for deletion');
    return false;
  }
  
  // Find the edge to delete
  const edgeToDelete = edges.find(edge => 
    edge.source === sourceId && edge.target === targetId
  );
  
  if (!edgeToDelete) {
    console.error(`Edge from ${sourceId} to ${targetId} not found`);
    return false;
  }

  // Remove the edge from the edges array
  const updatedEdges = edges.filter(edge => 
    !(edge.source === sourceId && edge.target === targetId)
  );
  setEdges(updatedEdges);

  console.log(`Edge from ${sourceId} to ${targetId} deleted successfully`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback({
      edgeId: edgeToDelete.id,
      deletedEdge: edgeToDelete,
      sourceId,
      targetId,
      remainingEdges: updatedEdges
    });
  }
  
  return true;
};

/**
 * Delete multiple edges from the graph by their IDs
 * @param {Array} edges - Current edges array
 * @param {Function} setEdges - Function to update edges state
 * @param {Array} edgeIds - Array of edge IDs to delete
 * @param {Function} callback - Optional callback function after deletion
 * @returns {Object} - Deletion results with success status and details
 */
export const deleteMultipleEdges = (edges, setEdges, edgeIds, callback) => {
  console.log(`Deleting ${edgeIds.length} edges: ${edgeIds.join(', ')}`);
  
  // Validate inputs
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return { success: false, error: 'Invalid edges array' };
  }
  
  if (!edgeIds || !Array.isArray(edgeIds) || edgeIds.length === 0) {
    console.error('Valid edge IDs array is required for deletion');
    return { success: false, error: 'Invalid edge IDs array' };
  }

  // Find edges to delete
  const edgesToDelete = edges.filter(edge => edgeIds.includes(edge.id));
  const deletedEdgeIds = edgesToDelete.map(edge => edge.id);
  const notFoundIds = edgeIds.filter(id => !deletedEdgeIds.includes(id));
  
  if (notFoundIds.length > 0) {
    console.warn(`Edges with IDs ${notFoundIds.join(', ')} not found`);
  }
  
  if (edgesToDelete.length === 0) {
    console.error('No valid edges found for deletion');
    return { success: false, error: 'No valid edges found' };
  }

  // Remove the edges from the edges array
  const updatedEdges = edges.filter(edge => !edgeIds.includes(edge.id));
  setEdges(updatedEdges);

  const result = {
    success: true,
    deletedEdges: edgesToDelete,
    remainingEdges: updatedEdges,
    notFoundIds
  };

  console.log(`Successfully deleted ${edgesToDelete.length} edges`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback(result);
  }
  
  return result;
};

/**
 * Delete all edges connected to a specific node
 * @param {Array} edges - Current edges array
 * @param {Function} setEdges - Function to update edges state
 * @param {string} nodeId - ID of the node whose edges should be deleted
 * @param {Function} callback - Optional callback function after deletion
 * @returns {Object} - Deletion results with success status and details
 */
export const deleteAllEdgesForNode = (edges, setEdges, nodeId, callback) => {
  console.log(`Deleting all edges connected to node: ${nodeId}`);
  
  // Validate inputs
  if (!edges || !Array.isArray(edges)) {
    console.error('Invalid edges array provided');
    return { success: false, error: 'Invalid edges array' };
  }
  
  if (!nodeId) {
    console.error('Node ID is required for edge deletion');
    return { success: false, error: 'Node ID is required' };
  }
  
  // Find edges connected to the node
  const connectedEdges = edges.filter(edge => 
    edge.source === nodeId || edge.target === nodeId
  );
  
  if (connectedEdges.length === 0) {
    console.log(`No edges found connected to node ${nodeId}`);
    return { success: true, deletedEdges: [], remainingEdges: edges };
  }

  // Remove the connected edges
  const updatedEdges = edges.filter(edge => 
    edge.source !== nodeId && edge.target !== nodeId
  );
  setEdges(updatedEdges);

  const result = {
    success: true,
    deletedEdges: connectedEdges,
    remainingEdges: updatedEdges,
    nodeId
  };

  console.log(`Successfully deleted ${connectedEdges.length} edges connected to node ${nodeId}`);
  
  // Execute callback if provided
  if (callback && typeof callback === 'function') {
    callback(result);
  }
  
  return result;
};

/**
 * Async version of deleteEdgeById
 * @param {Array} edges - Current edges array
 * @param {Function} setEdges - Function to update edges state
 * @param {string} edgeId - ID of the edge to delete
 * @param {Function} callback - Optional callback function after deletion
 * @returns {Promise<boolean>} - Success status of the deletion
 */
export const deleteEdgeByIdAsync = async (edges, setEdges, edgeId, callback) => {
  return new Promise((resolve) => {
    // Simulate async operation
    setTimeout(() => {
      const result = deleteEdgeById(edges, setEdges, edgeId, callback);
      resolve(result);
    }, 0);
  });
};

/**
 * Validate if an edge can be safely deleted
 * @param {Array} nodes - Current nodes array
 * @param {Array} edges - Current edges array
 * @param {string} edgeId - ID of the edge to validate
 * @returns {Object} - Validation result with canDelete flag and warnings
 */
export const validateEdgeDeletion = (nodes, edges, edgeId) => {
  // Find the edge
  const edge = edges.find(e => e.id === edgeId);
  if (!edge) {
    return { canDelete: false, error: 'Edge not found' };
  }

  // Find source and target nodes
  const sourceNode = nodes.find(n => n.id === edge.source);
  const targetNode = nodes.find(n => n.id === edge.target);
  
  const warnings = [];
  
  // Check if edge is critical for output nodes
  if (targetNode && targetNode.type === 'output') {
    warnings.push('Deleting this edge will disconnect an output node');
  }
  
  // Check if edge is critical for input nodes
  if (sourceNode && sourceNode.type === 'input') {
    warnings.push('Deleting this edge will disconnect an input node');
  }
  
  // Check if target node will become isolated
  if (targetNode) {
    const otherIncomingEdges = edges.filter(e => 
      e.target === edge.target && e.id !== edgeId
    );
    if (otherIncomingEdges.length === 0) {
      warnings.push('Target node will become isolated after deletion');
    }
  }
  
  // Check if source node will become isolated
  if (sourceNode) {
    const otherOutgoingEdges = edges.filter(e => 
      e.source === edge.source && e.id !== edgeId
    );
    if (otherOutgoingEdges.length === 0) {
      warnings.push('Source node will become isolated after deletion');
    }
  }

  return {
    canDelete: true,
    edge,
    sourceNode,
    targetNode,
    warnings
  };
};