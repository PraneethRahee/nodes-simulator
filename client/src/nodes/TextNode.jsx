import React, { useState, useCallback } from 'react';
import BaseNode from '@/components/BaseNode.jsx';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { extractVariables } from '@/utils/variableDetection';
import { Info } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';

const TextNode = React.memo(({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || NODE_DEFAULTS.text.text);

  const handleTextChange = useCallback((value) => {
    setText(value);
    console.log(`Text ${id} changed to:`, value);
  }, [id]);

  const inputs = React.useMemo(() => {
    const detectedVariables = extractVariables(text);
    return detectedVariables.map((variable, index) => ({
      id: `var-${variable}`,
      position: `${70 + (index * 35)}px`,
      label: variable
    }));
  }, [text]);

  const outputs = [{ id: 'output', position: '70px' }];

  return (
    <BaseNode
      id={id}
      data={data}
      type="text"
      title="Text Node"
      inputs={inputs}
      outputs={outputs}
      isConnectable={isConnectable}
      className="w-80"
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

TextNode.displayName = 'TextNode';

export default TextNode;
