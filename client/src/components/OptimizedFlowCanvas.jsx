import React, { useCallback, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  selectNodes,
  selectEdges,
  selectIsAlertShowing,
  selectAlertData,
  setNodes,
  setEdges,
  addEdge,
  setSelectedNode,
  deleteEdge,
  hideAlert,
} from '@/store';
import { deleteNodeWithConnectedEdges } from '@/store/thunks';

// Simple counter for generating unique IDs more efficiently than Date.now()
let edgeIdCounter = 0;

const OptimizedFlowCanvas = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(selectNodes);
  const edges = useSelector(selectEdges);
  const isAlertShowing = useSelector(selectIsAlertShowing);
  const alertData = useSelector(selectAlertData);
  
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  const alertTitleStyles = useMemo(() => ({
    validDAG: 'bg-emerald-100',
    invalidDAG: 'bg-red-100'
  }), []);

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

  const getNodeColor = useCallback((nodeType) => {
    return nodeColorMap[nodeType] || '#64748b';
  }, [nodeColorMap]);

  const onNodesChange = useCallback((changes) => {
    console.log('Node changes:', changes);
    // Use functional update to get the most current state
    dispatch(setNodes(currentNodes => {
      const updatedNodes = applyNodeChanges(changes, currentNodes);
      return updatedNodes;
    }));
  }, [dispatch]);

  const onEdgesChange = useCallback((changes) => {
    // Use functional update to get the most current state
    dispatch(setEdges(currentEdges => {
      const updatedEdges = applyEdgeChanges(changes, currentEdges);
      return updatedEdges;
    }));
  }, [dispatch]);

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `edge-${++edgeIdCounter}`,
      type: 'custom',
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
      },
    };
    dispatch(addEdge(newEdge));
  }, [dispatch]);

  const onNodeClick = useCallback((event, node) => {
    console.log('Node clicked:', node);
    dispatch(setSelectedNode(node.id));
  }, [dispatch]);

  const handleNodeDelete = useCallback((nodeId) => {
    console.log(`Deleting node ${nodeId} and its connected edges`);
    dispatch(deleteNodeWithConnectedEdges(nodeId));
  }, [dispatch]);

  const handleEdgeDelete = useCallback((edgeId) => {
    console.log(`Deleting edge ${edgeId}`);
    dispatch(deleteEdge(edgeId));
  }, [dispatch]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
      
      dispatch(setNodes(currentNodes => {
        const updatedNodes = applyNodeChanges([change], currentNodes);
        return updatedNodes;
      }));
    },
    [reactFlowInstance]
  );

  // Memoize nodes with delete handlers
  const nodesWithHandlers = useMemo(() =>
    nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDeleteNode: handleNodeDelete
      }
    })), [nodes, handleNodeDelete]);

  // Memoize edges with delete handlers
  const edgesWithHandlers = useMemo(() =>
    edges.map(edge => ({
      ...edge,
      data: {
        ...edge.data,
        onDeleteEdge: handleEdgeDelete
      }
    })), [edges, handleEdgeDelete]);

  const reactFlowProps = useMemo(() => ({
    nodes: nodesWithHandlers,
    edges: edgesWithHandlers,
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
    nodesWithHandlers,
    edgesWithHandlers,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onDrop,
    onDragOver,
    nodeTypes,
    edgeTypes,
  ]);

  const minimapProps = useMemo(() => ({
    nodeColor: getNodeColor,
    maskColor: "rgba(255, 255, 255, 0.8)",
  }), [getNodeColor]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          {...reactFlowProps}
        >
          <Background variant="dots" gap={20} size={1} />
          <Controls />
          <MiniMap {...minimapProps} />
        </ReactFlow>
      </div>

      <FlowControls />

      <FlowAlert
        show={isAlertShowing}
        alertData={alertData}
        alertTitleStyles={alertTitleStyles}
        onClose={() => dispatch(hideAlert())}
      />
    </div>
  );
};

export default React.memo(OptimizedFlowCanvas);