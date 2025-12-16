import React, { useState, useCallback } from 'react';
import FlowCanvas from '@/components/FlowCanvas.jsx';
import NodePalette from '@/components/NodePalette.jsx';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';

const PipelineEditor = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Input Node' },
    },
  ]);
  const [edges, setEdges] = useState([]);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const handleEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      <NodePalette />
      <FlowCanvas
        onNodeSelect={handleNodeSelect}
        selectedNode={selectedNode}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
      />
    </div>
  );
};

export default PipelineEditor;
