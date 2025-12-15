import React, { useState, useCallback, useRef } from 'react';
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
// import { validateDAG } from '@/utils/dagValidation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

import { submitPipeline } from "./submit";

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
  selectedNode,
  onNodesChange: externalOnNodesChange,
  onEdgesChange: externalOnEdgesChange,
  nodes: externalNodes,
  edges: externalEdges
}) => {
  const [nodes, setNodes] = useState(externalNodes || initialNodes);
  const [edges, setEdges] = useState(externalEdges || initialEdges);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback((changes) => {
    console.log('Node changes:', changes);
    setNodes((nds) => {
      const newNodes = applyNodeChanges(changes, nds);
      console.log('Updated nodes:', newNodes);
      return newNodes;
    });
    if (externalOnNodesChange) externalOnNodesChange(changes);
  }, [externalOnNodesChange]);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
    if (externalOnEdgesChange) externalOnEdgesChange(changes);
  }, [externalOnEdgesChange]);

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'smoothstep',
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);

  const onNodeClick = useCallback((event, node) => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  }, [onNodeSelect]);

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
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const handleSubmit = async () => {

    const result = await submitPipeline(nodes, edges);

    if (!result) {
      alert("Backend not reachable");
      return;
    }

    alert(`Nodes: ${result.nodeCount}, Edges: ${result.edgeCount}, DAG: ${result.isValidDAG}`);
    setAlertData(result);
  };



  // const getNodeCountColor = () => {
  //   if (nodes.length === 0) return 'text-gray-500';
  //   if (nodes.length < 5) return 'text-blue-600';
  //   if (nodes.length < 10) return 'text-green-600';
  //   return 'text-amber-600';
  // };

  // const getEdgeCountColor = () => {
  //   if (edges.length === 0) return 'text-gray-500';
  //   if (edges.length < 3) return 'text-blue-600';
  //   if (edges.length < 8) return 'text-green-600';
  //   return 'text-amber-600';
  // };

  // const getDAGStatus = () => {
  //   if (nodes.length === 0) return { text: 'No nodes', color: 'text-gray-500' };
  //   const validation = validateDAG(nodes, edges);
  //   return {
  //     text: validation.isValid ? 'Valid DAG' : 'Invalid DAG',
  //     color: validation.isValid ? 'text-emerald-600' : 'text-red-600'
  //   };
  // };
  //
  // const dagStatus = getDAGStatus();

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
          fitView={false}
          defaultZoom={1}
          className="bg-slate-50"
        >
          <Background variant="dots" gap={20} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const colorMap = {
                input: '#3b82f6',
                output: '#10b981',
                text: '#8b5cf6',
                llm: '#f59e0b',
                email: '#ec4899',
                logger: '#6b7280',
                math: '#06b6d4',
                delay: '#f97316',
                condition: '#84cc16'
              };
              return colorMap[node.type] || '#64748b';
            }}
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

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                alertData.isValidDAG ? 'bg-emerald-100' : 'bg-red-100'
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
                <span className={`font-semibold ${alertData.isValidDAG ? 'text-emerald-600' : 'text-red-600'}`}>
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



