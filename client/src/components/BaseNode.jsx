import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { cn } from '../lib/utils';
import NodeDeleteButton from './NodeDelete.jsx';
import {
  NODE_COLOR_CLASSES,
  NODE_HANDLE_COLORS,
  NODE_INDICATOR_COLORS,
  DEFAULT_NODE_COLOR,
  DEFAULT_HANDLE_COLOR,
  DEFAULT_INDICATOR_COLOR
} from '../constants/nodeStyles.js';

const createInputHandles = (inputs, handleColor, isConnectable, nodeType) =>
  inputs.map((input, index) => {
    const position = input.position || '90px';

    return (
      <div key={`input-${index}`} className="relative">
        <Handle
          type="target"
          position={Position.Left}
          id={input.id || `input-${index}`}
          style={{
            background: handleColor,
            top: position,
            left: '-8px',
            width: '16px',
            height: '16px',
            border: '2px solid white',
            borderRadius: '50%',
            transform: 'translateY(-50%)'
          }}
          isConnectable={isConnectable}
        />
        {input.label && nodeType !== 'text' && (
          <div
            className="absolute text-xs font-medium text-slate-600 pointer-events-none"
            style={{
              top: position,
              left: '12px',
              transform: 'translateY(-50%)'
            }}
          >
            {input.label}
          </div>
        )}
      </div>
    );
  });

const createOutputHandles = (outputs, handleColor, isConnectable) =>
  outputs.map((output, index) => {
    const position = output.position || '90px';

    return (
      <Handle
        key={`output-${index}`}
        type="source"
        position={Position.Right}
        id={output.id || `output-${index}`}
        style={{
          background: handleColor,
          top: position,
          right: '-8px',
          width: '16px',
          height: '16px',
          border: '2px solid white',
          borderRadius: '50%',
          transform: 'translateY(-50%)'
        }}
        isConnectable={isConnectable}
      />
    );
  });

const BaseNode = React.memo(({type,title,icon,children,inputs = [],outputs = [],className,isConnectable = true,id, onDeleteNode}) => {
  // Memoized color classes to prevent recreation on every render
  const colorClasses = React.useMemo(() => ({
    handle: NODE_HANDLE_COLORS[type] || DEFAULT_HANDLE_COLOR,
    header: NODE_COLOR_CLASSES[type] || DEFAULT_NODE_COLOR,
    indicator: NODE_INDICATOR_COLORS[type] || DEFAULT_INDICATOR_COLOR
  }), [type]);

  // Memoized input handles
  const inputHandles = React.useMemo(() =>
    createInputHandles(inputs, colorClasses.handle, isConnectable, type),
    [inputs, colorClasses.handle, isConnectable, type]
  );

  // Memoized output handles
  const outputHandles = React.useMemo(() =>
    createOutputHandles(outputs, colorClasses.handle, isConnectable),
    [outputs, colorClasses.handle, isConnectable]
  );

  // Memoized delete handler
  const handleNodeDelete = React.useCallback((nodeId) => {
    console.log(`BaseNode handleNodeDelete called with nodeId: ${nodeId}`);
    console.log('onDeleteNode function:', onDeleteNode);
    onDeleteNode(nodeId);
  }, [onDeleteNode]);

  // Memoized card classes
  const cardClasses = React.useMemo(() =>
    cn(
      "w-80 min-w-80 shadow-lg hover:shadow-xl transition-shadow border-2 bg-white",
      className
    ),
    [className]
  );

  // Memoized header classes
  const headerClasses = React.useMemo(() =>
    cn("p-3 pb-2 rounded-t-lg", colorClasses.header),
    [colorClasses.header]
  );

  // Memoized icon container classes
  const iconContainerClasses = React.useMemo(() =>
    cn("w-4 h-4 flex items-center justify-center", colorClasses.indicator.replace('bg-', 'text-')),
    [colorClasses.indicator]
  );

  return (
    <Card className={cardClasses}>
      <CardHeader className={headerClasses}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon ? (
              <div className={iconContainerClasses}>
                {icon}
              </div>
            ) : (
              <div className={cn("w-3 h-3 rounded-full", colorClasses.indicator)} />
            )}
            <h3 className="font-medium text-slate-800 text-sm">{title}</h3>
          </div>
          <NodeDeleteButton
            nodeId={id || 'unknown'}
            nodeTitle={title}
            onNodeDelete={handleNodeDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        {children}
      </CardContent>

      {inputHandles}
      {outputHandles}
    </Card>
  );
});

BaseNode.displayName = 'BaseNode';

export default BaseNode;

