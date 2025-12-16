import React, { useState, useCallback } from 'react';
import FlowCanvas from '@/components/FlowCanvas.jsx';
import NodePalette from '@/components/NodePalette.jsx';

const PipelineEditor = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      <NodePalette />
      <FlowCanvas
        onNodeSelect={handleNodeSelect}
        selectedNode={selectedNode}
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      />
    </div>
  );
};

export default PipelineEditor;
