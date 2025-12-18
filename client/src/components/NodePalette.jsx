import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Save, Download } from 'lucide-react';

const NodePalette = React.memo(() => {
  // Memoized drag start handler
  const onDragStart = useCallback((event, nodeType) => {
    console.log('Drag started for node type:', nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  // Memoized node categories to prevent recreation
  const nodeCategories = useMemo(() => [
    {
      title: 'Core Nodes',
      nodes: [
        { type: 'input', title: 'Input Node', description: 'Data input source', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
        { type: 'output', title: 'Output Node', description: 'Data output destination', color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
        { type: 'text', title: 'Text Node', description: 'Text processing with variables', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
        { type: 'llm', title: 'LLM Node', description: 'Language model processing', color: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
      ]
    },
    {
      title: 'Demo Nodes',
      nodes: [
        { type: 'email', title: 'Email Node', description: 'Send email notifications', color: 'bg-pink-50 border-pink-200 hover:bg-pink-100' },
        { type: 'logger', title: 'Logger Node', description: 'Log system events', color: 'bg-gray-50 border-gray-200 hover:bg-gray-100' },
        { type: 'math', title: 'Math Node', description: 'Mathematical operations', color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100' },
        { type: 'delay', title: 'Delay Node', description: 'Add time delays', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
        { type: 'condition', title: 'Condition Node', description: 'Conditional logic', color: 'bg-lime-50 border-lime-200 hover:bg-lime-100' },
      ]
    }
  ], []);

  // Memoized indicator color map
  const indicatorColorMap = useMemo(() => ({
    input: 'bg-blue-600',
    output: 'bg-emerald-600',
    text: 'bg-purple-600',
    llm: 'bg-amber-600',
    email: 'bg-pink-600',
    logger: 'bg-gray-600',
    math: 'bg-cyan-600',
    delay: 'bg-orange-600',
    condition: 'bg-lime-600'
  }), []);

  // Memoized function to get indicator color
  const getIndicatorColor = useCallback((nodeType) => {
    return indicatorColorMap[nodeType] || 'bg-slate-600';
  }, [indicatorColorMap]);

  // Memoized node item component to prevent recreation
  const NodeItem = useCallback(({ node }) => (
    <div
      className={`p-3 border rounded-lg cursor-pointer transition-colors ${node.color}`}
      draggable
      onDragStart={(event) => onDragStart(event, node.type)}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${getIndicatorColor(node.type)}`} />
        <span className="text-sm font-medium text-slate-700">{node.title}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{node.description}</p>
    </div>
  ), [onDragStart, getIndicatorColor]);

  // Memoized category component
  const CategorySection = useCallback(({ category }) => (
    <div key={category.title}>
      <h3 className="text-sm font-medium text-slate-700 mb-3 uppercase tracking-wider">
        {category.title}
      </h3>
      <div className="space-y-2">
        {category.nodes.map((node) => (
          <NodeItem key={node.type} node={node} />
        ))}
      </div>
    </div>
  ), []);

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {nodeCategories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
});

NodePalette.displayName = 'NodePalette';

export default NodePalette;
