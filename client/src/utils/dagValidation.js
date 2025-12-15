export const validateDAG = (nodes, edges) => {
  if (nodes.length === 0) {
    return { isValid: true, error: null };
  }
  
  const adjacencyList = new Map();
  const inDegree = new Map();
  
  nodes.forEach(node => {
    adjacencyList.set(node.id, []);
    inDegree.set(node.id, 0);
  });
  
  edges.forEach(edge => {
    const source = edge.source;
    const target = edge.target;
    
    if (!adjacencyList.has(source) || !adjacencyList.has(target)) {
      return { isValid: false, error: 'Invalid edge connection' };
    }

    adjacencyList.get(source).push(target);
    inDegree.set(target, inDegree.get(target) + 1);
  });

  
  const queue = [];
  const visited = new Set();
  
  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) {
      queue.push(nodeId);
    }
  });

  let processedNodes = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    visited.add(current);
    processedNodes++;
    
    adjacencyList.get(current).forEach(neighbor => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }
  
  if (processedNodes === nodes.length) {
    return { isValid: true, error: null };
  } else {
    return { isValid: false, error: 'Cycle detected in graph' };
  }
};

export const hasCycles = (nodes, edges) => {
  const adjacencyList = new Map();
  const visited = new Set();
  const recursionStack = new Set();

  nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach(edge => {
    if (adjacencyList.has(edge.source)) {
      adjacencyList.get(edge.source).push(edge.target);
    }
  });

  const dfs = (nodeId) => {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        return true; 
      }
    }

    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        return true;
      }
    }
  }

  return false;
};

export const getGraphStats = (nodes, edges) => {
  const stats = {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    connectedComponents: 0,
    maxDepth: 0,
    hasIsolatedNodes: false
  };

  if (nodes.length === 0) {
    return stats;
  }

  const connectedNodes = new Set();
  edges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  stats.hasIsolatedNodes = connectedNodes.size < nodes.length;

  const visited = new Set();
  let components = 0;

  const dfs = (nodeId, adjacencyList) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    neighbors.forEach(neighbor => dfs(neighbor, adjacencyList));
  };

  const adjacencyList = new Map();
  nodes.forEach(node => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach(edge => {
    adjacencyList.get(edge.source).push(edge.target);
    adjacencyList.get(edge.target).push(edge.source);
  });

  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      dfs(node.id, adjacencyList);
      components++;
    }
  });

  stats.connectedComponents = components;

  return stats;
};
