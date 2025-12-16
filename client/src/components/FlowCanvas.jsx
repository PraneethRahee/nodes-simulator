import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/nodes/nodeTypes.jsx';
import { edgeTypes } from '@/components/edgeTypes.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { submitPipeline } from "./submit";
import { deleteNodeById, validateNodeDeletion } from '@/utils/enhancedNodeDeletion.js';
import { deleteEdgeById, validateEdgeDeletion } from '@/utils/edgeDeletion.js';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: 'Input Node' },
  },
];

const initialEdges = [];

const FlowCanvas = ({
  onNodeSelect,
  onNodesChange: externalOnNodesChange,
  onEdgesChange: externalOnEdgesChange,
  nodes: externalNodes,
  edges: externalEdges
}) => {

  const [internalNodes, setInternalNodes] = useState(initialNodes);
  const [internalEdges, setInternalEdges] = useState(initialEdges);
  
  const nodes = externalNodes !== undefined ? externalNodes : internalNodes;
  const edges = externalEdges !== undefined ? externalEdges : internalEdges;
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const alertTitleStyles = useMemo(() => ({
    validDAG: 'bg-emerald-100',
    invalidDAG: 'bg-red-100'
  }), []);

  const onNodesChange = useCallback((changes) => {
    console.log('Node changes:', changes);
    
    if (externalOnNodesChange) {
      externalOnNodesChange(changes);
    } else {
      setInternalNodes((nds) => {
        const newNodes = applyNodeChanges(changes, nds);
        console.log('Updated nodes:', newNodes);
        return newNodes;
      });
    }
  }, [externalOnNodesChange]);

  const onEdgesChange = useCallback((changes) => {
    if (externalOnEdgesChange) {
      externalOnEdgesChange(changes);
    } else {
      setInternalEdges((eds) => applyEdgeChanges(changes, eds));
    }
  }, [externalOnEdgesChange]);

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
    
    if (externalOnEdgesChange) {
      const change = {
        type: 'add',
        item: newEdge
      };
      externalOnEdgesChange([change]);
    } else {
      setInternalEdges((eds) => addEdge(newEdge, eds));
    }
  }, [externalOnEdgesChange]);

  const onNodeClick = useCallback((event, node) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);
  
  const handleDeleteNode = useCallback((nodeId) => {
    
    const validation = validateNodeDeletion(nodes, edges, nodeId);
    
    if (!validation.canDelete) {
      console.error('Cannot delete node:', validation.error);
      return;
    }
    
    if (validation.warnings.length > 0) {
      console.warn('Node deletion warnings:', validation.warnings);
    }
    
    deleteNodeById(
      nodes,
      (newNodes) => {
        if (externalOnNodesChange) {
          const change = {
            type: 'remove',
            id: nodeId
          };
          externalOnNodesChange([change]);
        } else {
          setInternalNodes(newNodes);
        }
      },
      (newEdges) => {
        if (externalOnEdgesChange) {
          const connectedEdges = edges.filter(edge =>
            edge.source === nodeId || edge.target === nodeId
          );
          const changes = connectedEdges.map(edge => ({
            type: 'remove',
            id: edge.id
          }));
          externalOnEdgesChange(changes);
        } else {
          setInternalEdges(newEdges);
        }
      },
      nodeId,
      edges,
      (result) => {
        console.log('Node deletion completed:', result);
      }
    );
  }, [nodes, edges, externalOnNodesChange, externalOnEdgesChange]);

  
  const handleDeleteEdge = useCallback((edgeId) => {
    
    const validation = validateEdgeDeletion(nodes, edges, edgeId);
    
    if (!validation.canDelete) {
      console.error('Cannot delete edge:', validation.error);
      return;
    }
    
    if (validation.warnings.length > 0) {
      console.warn('Edge deletion warnings:', validation.warnings);
    }
    
    
    deleteEdgeById(
      edges,
      (newEdges) => {
        if (externalOnEdgesChange) {
          const change = {
            type: 'remove',
            id: edgeId
          };
          externalOnEdgesChange([change]);
        } else {
          
          setInternalEdges(newEdges);
        }
      },
      edgeId,
      (result) => {
        console.log('Edge deletion completed:', result);
      }
    );
  }, [nodes, edges, externalOnEdgesChange]);
  
  useEffect(() => {
    const handleNodeDeleteEvent = (event) => {
      const { nodeId } = event.detail;
      handleDeleteNode(nodeId);
    };

    const handleEdgeDeleteEvent = (event) => {
      const { edgeId } = event.detail;
      handleDeleteEdge(edgeId);
    };

    document.addEventListener('deleteNode', handleNodeDeleteEvent);
    document.addEventListener('deleteEdge', handleEdgeDeleteEvent);

    return () => {
      document.removeEventListener('deleteNode', handleNodeDeleteEvent);
      document.removeEventListener('deleteEdge', handleEdgeDeleteEvent);
    };
  }, [handleDeleteNode, handleDeleteEdge, externalOnNodesChange, externalOnEdgesChange]);

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
      
      if (externalOnNodesChange) {
        const change = {
          type: 'add',
          item: newNode
        };
        externalOnNodesChange([change]);
      } else {
        setInternalNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );

  const handleSubmit = useCallback(async () => {
    const result = await submitPipeline(nodes, edges);

    if (!result) {
      alert("Backend not reachable");
      return;
    }

    setAlertData(result);
    setShowAlert(true);
  }, [nodes, edges]);
  
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

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView={false}
          defaultZoom={1}
          className="bg-slate-50"
        >
          <Background variant="dots" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={getNodeColor}
            maskColor="rgba(255, 255, 255, 0.8)"
          />
        </ReactFlow>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                alertData.isValidDAG ? alertTitleStyles.validDAG : alertTitleStyles.invalidDAG
              }`}>
                {alertData.isValidDAG ? (
                  <div className="w-4 h-4 bg-emerald-600 rounded-full" />
                ) : (
                  <div className="w-4 h-4 bg-red-600 rounded-full" />
                )}
              </div>
              Pipeline Validation Results
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Nodes:</span>
                <span className="font-semibold text-slate-800">{alertData.nodeCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Edges:</span>
                <span className="font-semibold text-slate-800">{alertData.edgeCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">DAG Status:</span>
                <span className={`font-semibold ${
                  alertData.isValidDAG ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {alertData.isValidDAG ? 'Valid' : 'Invalid'}
                </span>
              </div>
              {alertData.error && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Error:</span>
                  <span className="font-semibold text-red-600">{alertData.error}</span>
                </div>
              )}
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlowCanvas;
