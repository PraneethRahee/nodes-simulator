import React, { useState, useCallback, useMemo } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { extractVariables } from '../utils/variableDetection.js';
import { Info, Type } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';

// Memoize static outputs array to prevent recreation on every render
const outputs = [{ id: 'output' }];

const OutputNode = React.memo(({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || NODE_DEFAULTS.output.text);

  const handleTextChange = useCallback((value) => {
    setText(value);
    console.log(`Text ${id} changed to:`, value);
  }, [id]);

  const inputs = useMemo(() => {
    const detectedVariables = extractVariables(text);
    return detectedVariables.map((variable, index) => ({
      id: `var-${variable}`,
      position: `${70 + (index * 35)}px`,
      label: variable
    }));
  }, [text]);

  return (
      <BaseNode
          type="output"
          title="Output Node"
          icon={<Type className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
      >
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-template`} className="text-sm font-medium text-slate-700">
              Template
            </Label>
            <Textarea
                id={`${id}-template`}
                placeholder={INPUT_PLACEHOLDERS.textTemplate}
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full resize-none"
                rows={4}
            />
          </div>
          {inputs.length > 0 && (
              <div className="flex items-start space-x-2 text-xs text-slate-500">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>Variables detected: {inputs.map(input => input.label).join(', ')}</span>
              </div>
          )}
        </div>
      </BaseNode>
  );
});

OutputNode.displayName = 'OutputNode';

export default OutputNode;
