import React, { useState, useEffect } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { extractVariables } from '../utils/variableDetection.js';
import { Info, Type } from 'lucide-react';

const OutputNode = ({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const detectedVariables = extractVariables(text);
    setVariables(detectedVariables);
  }, [text]);

  const handleTextChange = (value) => {
    setText(value);
    console.log(`Text ${id} changed to:`, value);
  };

  const inputs = variables.map((variable, index) => ({
    id: `var-${variable}`,
    position: `${70 + (index * 35)}px`,
    label: variable
  }));

  const outputs = [{ id: 'output' }];

  return (
      <BaseNode
          type="output"
          title="Output Node"
          icon={<Type className="w-4 h-4" />}
          inputs={[{ id: 'input' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-template`} className="text-sm font-medium text-slate-700">
              Template
            </Label>
            <Textarea
                id={`${id}-template`}
                placeholder="Enter text template"
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full resize-none"
                rows={4}
            />
          </div>
          {variables.length > 0 && (
              <div className="flex items-start space-x-2 text-xs text-slate-500">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Variables detected: {variables.join(', ')}</span>
              </div>
          )}
        </div>
      </BaseNode>
  );
};

export default OutputNode;
