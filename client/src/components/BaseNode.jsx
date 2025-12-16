import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { cn } from '../lib/utils';
import { 
  NODE_COLOR_CLASSES, 
  NODE_HANDLE_COLORS, 
  NODE_INDICATOR_COLORS,
  DEFAULT_NODE_COLOR,
  DEFAULT_HANDLE_COLOR,
  DEFAULT_INDICATOR_COLOR
} from '../constants/nodeStyles.js';

const createInputHandles = (inputs, handleColor, isConnectable) => 
  inputs.map((input, index) => (
    <div key={`input-${index}`} className="relative">
      <Handle
        type="target"
        position={Position.Left}
        id={input.id || `input-${index}`}
        style={{
          background: handleColor,
          top: input.position || `${70 + (index * 35)}px`,
          left: '-8px',
          width: '16px',
          height: '16px',
          border: '2px solid white',
          borderRadius: '50%',
          transform: 'translateY(-50%)'
        }}
        isConnectable={isConnectable}
      />
      {input.label && (
        <div
          className="absolute text-xs font-medium text-slate-600 pointer-events-none"
          style={{
            top: input.position || `${70 + (index * 35)}px`,
            left: '12px',
            transform: 'translateY(-50%)'
          }}
        >
          {input.label}
        </div>
      )}
    </div>
  ));

const createOutputHandles = (outputs, handleColor, isConnectable) => 
  outputs.map((output, index) => (
    <Handle
      key={`output-${index}`}
      type="source"
      position={Position.Right}
      id={output.id || `output-${index}`}
      style={{
        background: handleColor,
        top: output.position || '50%',
        right: '-8px',
        width: '16px',
        height: '16px',
        border: '2px solid white',
        borderRadius: '50%',
        transform: 'translateY(-50%)'
      }}
      isConnectable={isConnectable}
    />
  ));

const BaseNode = React.memo(({type,title,icon,children,inputs = [],outputs = [],className,isConnectable = true}) => {
  const colorClasses = {
    handle: NODE_HANDLE_COLORS[type] || DEFAULT_HANDLE_COLOR,
    header: NODE_COLOR_CLASSES[type] || DEFAULT_NODE_COLOR,
    indicator: NODE_INDICATOR_COLORS[type] || DEFAULT_INDICATOR_COLOR
  };

  const inputHandles = createInputHandles(inputs, colorClasses.handle, isConnectable);
  const outputHandles = createOutputHandles(outputs, colorClasses.handle, isConnectable);

  return (
    <Card className={cn(
      "w-80 min-w-80 shadow-lg hover:shadow-xl transition-shadow border-2 bg-white",
      className
    )}>
      <CardHeader className={cn("p-3 pb-2 rounded-t-lg", colorClasses.header)}>
        <div className="flex items-center space-x-2">
          {icon ? (
            <div className={cn("w-4 h-4 flex items-center justify-center", colorClasses.indicator.replace('bg-', 'text-'))}>
              {icon}
            </div>
          ) : (
            <div className={cn("w-3 h-3 rounded-full", colorClasses.indicator)} />
          )}
          <h3 className="font-medium text-slate-800 text-sm">{title}</h3>
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
