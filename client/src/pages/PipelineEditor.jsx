import React, { useState, useCallback } from 'react';
import FlowCanvas from '@/components/FlowCanvas.jsx';
import NodePalette from '@/components/NodePalette.jsx';
import PropertiesPanel from '@/components/PropertiesPanel.jsx';

const PipelineEditor = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [nodes, setNodes] = useState([

  ]);
  const [edges, setEdges] = useState([]);

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
    setShowPropertiesPanel(true);
  }, []);

  const handleNodeUpdate = useCallback((nodeId, updatedNode) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId ? updatedNode : node
      )
    );
  }, []);

  const handleSubmit = useCallback(() => {
    // This will be handled by the FlowCanvas component
    console.log('Pipeline submitted');
  }, []);

  const handleClosePropertiesPanel = useCallback(() => {
    setShowPropertiesPanel(false);
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      <NodePalette onSubmit={handleSubmit} />
      
      {/* Main Canvas */}
      <FlowCanvas
        onNodeSelect={handleNodeSelect}
        selectedNode={selectedNode}
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      />

      {/*{showPropertiesPanel && (*/}
      {/*  <PropertiesPanel*/}
      {/*    selectedNode={selectedNode}*/}
      {/*    onClose={handleClosePropertiesPanel}*/}
      {/*    onNodeUpdate={handleNodeUpdate}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default PipelineEditor;
