import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { cn } from '../lib/utils';

const BaseNode = ({
                      type,
                      title,
                      icon,
                      children,
                      inputs = [],
                      outputs = [],
                      className,
                      isConnectable = true
                  }) => {
    const getColorClasses = (nodeType) => {
        const colorMap = {
            input: 'bg-blue-50 border-blue-200',
            output: 'bg-emerald-50 border-emerald-200',
            text: 'bg-purple-50 border-purple-200',
            llm: 'bg-amber-50 border-amber-200',
            email: 'bg-pink-50 border-pink-200',
            logger: 'bg-gray-50 border-gray-200',
            math: 'bg-cyan-50 border-cyan-200',
            delay: 'bg-orange-50 border-orange-200',
            condition: 'bg-lime-50 border-lime-200'
        };
        return colorMap[nodeType] || 'bg-slate-50 border-slate-200';
    };

    const getHandleColor = (nodeType) => {
        const colorMap = {
            input: 'hsl(217, 91%, 60%)',
            output: 'hsl(142, 76%, 36%)',
            text: 'hsl(262, 83%, 58%)',
            llm: 'hsl(43, 96%, 56%)',
            email: 'hsl(322, 84%, 58%)',
            logger: 'hsl(220, 9%, 46%)',
            math: 'hsl(188, 96%, 53%)',
            delay: 'hsl(24, 95%, 53%)',
            condition: 'hsl(82, 85%, 67%)'
        };
        return colorMap[nodeType] || 'hsl(220, 5.3%, 44.7%)';
    };

    const getIndicatorColor = (nodeType) => {
        const colorMap = {
            input: 'bg-blue-600',
            output: 'bg-emerald-600',
            text: 'bg-purple-600',
            llm: 'bg-amber-600',
            email: 'bg-pink-600',
            logger: 'bg-gray-600',
            math: 'bg-cyan-600',
            delay: 'bg-orange-600',
            condition: 'bg-lime-600'
        };
        return colorMap[nodeType] || 'bg-slate-600';
    };

    const handleColor = getHandleColor(type);
    const headerClass = getColorClasses(type);
    const indicatorClass = getIndicatorColor(type);

    return (
        <Card className={cn(
            "w-80 min-w-80 shadow-lg hover:shadow-xl transition-shadow border-2 bg-white",
            className
        )}>
            <CardHeader className={cn("p-3 pb-2 rounded-t-lg", headerClass)}>
                <div className="flex items-center space-x-2">
                    {icon ? (
                        <div className={cn("w-4 h-4 flex items-center justify-center", indicatorClass.replace('bg-', 'text-'))}>
                            {icon}
                        </div>
                    ) : (
                        <div className={cn("w-3 h-3 rounded-full", indicatorClass)} />
                    )}
                    <h3 className="font-medium text-slate-800 text-sm">{title}</h3>
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                {children}
            </CardContent>

            {inputs.map((input, index) => (
                <div key={`input-${index}`} className="relative">
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={input.id || `input-${index}`}
                        style={{
                            background: handleColor,
                            top: input.position || `${-105 - (index * 35)}px`,
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
                                top: input.position || `${20 + (index * 35)}px`,
                                left: '12px',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            {input.label}
                        </div>
                    )}
                </div>
            ))}

            {outputs.map((output, index) => (
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
            ))}
        </Card>
    );
};

export default BaseNode;




