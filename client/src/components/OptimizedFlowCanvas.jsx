import React, { useState, useCallback, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/nodes/nodeTypes.jsx';
import { edgeTypes } from '@/components/edgeTypes.jsx';
import FlowControls from './FlowControls.jsx';
import FlowAlert from './FlowAlert.jsx';

const OptimizedFlowCanvas = () => {
  // Use local state for React Flow to manage its own state
  const [nodes, setNodes] = useState([
    {
      id: '1',
      type: 'input',
      position: { x: 100, y: 100 },
      data: { label: 'Input Node' },
    },
  ]);
  const [edges, setEdges] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Memoized alert title styles to prevent recreation
  const alertTitleStyles = useMemo(() => ({
    validDAG: 'bg-emerald-100',
    invalidDAG: 'bg-red-100'
  }), []);

  // Memoized node color map for MiniMap
  const nodeColorMap = useMemo(() => ({
    input: '#3b82f6',
    output: '#10b981',
    text: '#8b5cf6',
    llm: '#f59e0b',
    email: '#ec4899',
    logger: '#6b7280',
    math: '#06b6d4',
    delay: '#f97316',
    condition: '#84cc16'
  }), []);

  // Memoized function to get node color
  const getNodeColor = useCallback((nodeType) => {
    return nodeColorMap[nodeType] || '#64748b';
  }, [nodeColorMap]);

  // Optimized nodes change handler
  const onNodesChange = useCallback((changes) => {
    console.log('Node changes:', changes);
    setNodes(currentNodes => applyNodeChanges(changes, currentNodes));
  }, []);

  // Optimized edges change handler
  const onEdgesChange = useCallback((changes) => {
    setEdges(currentEdges => applyEdgeChanges(changes, currentEdges));
  }, []);

  // Optimized connection handler
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `edge-${Date.now()}`,
      type: 'custom',
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
      },
    };
    setEdges(prevEdges => [...prevEdges, newEdge]);
  }, []);

  // Optimized node click handler
  const onNodeClick = useCallback((event, node) => {
    // Handle node selection if needed
    console.log('Node clicked:', node);
  }, []);

  // Handle node deletion
  const handleNodeDelete = useCallback((nodeId) => {
    console.log(`Deleting node ${nodeId} and its connected edges`);
    
    // Use functional updates to get the latest state
    setNodes(currentNodes => {
      const nodeChanges = [{
        type: 'remove',
        id: nodeId
      }];
      
      const newNodes = applyNodeChanges(nodeChanges, currentNodes);
      console.log('New nodes after deletion:', newNodes);
      
      // Update edges with the latest state
      setEdges(currentEdges => {
        const edgeChanges = currentEdges
          .filter(edge => edge.source === nodeId || edge.target === nodeId)
          .map(edge => ({
            type: 'remove',
            id: edge.id
          }));
        
        const newEdges = applyEdgeChanges(edgeChanges, currentEdges);
        console.log('New edges after deletion:', newEdges);
        
        return newEdges;
      });
      
      return newNodes;
    });
  }, []); // Remove nodes and edges from dependencies to avoid stale closures

  // Handle edge deletion
  const handleEdgeDelete = useCallback((edgeId) => {
    console.log(`Deleting edge ${edgeId}`);
    
    // Use functional update to get the latest state
    setEdges(currentEdges => {
      const edgeChanges = [{
        type: 'remove',
        id: edgeId
      }];
      
      const newEdges = applyEdgeChanges(edgeChanges, currentEdges);
      console.log('New edges after deletion:', newEdges);
      
      return newEdges;
    });
  }, []); // No dependencies needed with functional updates

  // Optimized drag over handler
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Optimized drop handler
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      console.log('Drop event, node type:', type);

      if (typeof type === 'undefined' || !type) {
        console.log('No valid node type found in drop event');
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      console.log('Creating new node:', newNode);
      
      const change = {
        type: 'add',
        item: newNode
      };
      
      setNodes(currentNodes => applyNodeChanges([change], currentNodes));
    },
    [reactFlowInstance]
  );

  // Memoized ReactFlow props to prevent unnecessary re-renders
  const reactFlowProps = useMemo(() => ({
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onDrop,
    onDragOver,
    onInit: setReactFlowInstance,
    nodeTypes: nodeTypes,
    edgeTypes,
    fitView: false,
    defaultZoom: 1,
    className: "bg-slate-50",
    minZoom: 0.1,
    maxZoom: 4,
    selectNodesOnDrag: false,
    nodesDraggable: true,
    nodesConnectable: true,
    elementsSelectable: true,
    snapToGrid: true,
    snapGrid: [15, 15],
  }), [
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onDrop,
    onDragOver,
    handleNodeDelete,
    nodeTypes,
    edgeTypes,
  ]);

  // Memoized MiniMap props
  const minimapProps = useMemo(() => ({
    nodeColor: getNodeColor,
    maskColor: "rgba(255, 255, 255, 0.8)",
  }), [getNodeColor]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          {...reactFlowProps}
          nodes={nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              onDeleteNode: handleNodeDelete
            }
          }))}
          edges={edges.map(edge => ({
            ...edge,
            data: {
              ...edge.data,
              onDeleteEdge: handleEdgeDelete
            }
          }))}
        >
          <Background variant="dots" gap={20} size={1} />
          <Controls />
          <MiniMap {...minimapProps} />
        </ReactFlow>
      </div>

      <FlowControls
        nodes={nodes}
        edges={edges}
        onAlert={(data) => {
          setAlertData(data);
          setShowAlert(true);
        }}
        onError={(error) => console.error(error)}
      />

      <FlowAlert
        show={showAlert}
        alertData={alertData}
        alertTitleStyles={alertTitleStyles}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default React.memo(OptimizedFlowCanvas);