import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { extractVariables } from '../utils/variableDetection.js';
import { Info, Type } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';

const outputs = []; 

const OutputNode = React.memo(({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || NODE_DEFAULTS.output.text);
  const textareaRef = useRef(null);
  
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {    
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);
  
  useEffect(() => {
    adjustHeight();
  }, [text, adjustHeight]);

  const handleTextChange = useCallback((value) => {
    setText(value);
    console.log(`Text ${id} changed to:`, value);
  }, [id]);

  const inputs = useMemo(() => {
    const detectedVariables = extractVariables(text);
    const variableInputs = detectedVariables.map((variable, index) => ({
      id: `var-${variable}`,
      label: variable,
      position: `${-80 + (index * 30)}px` 
    }));

    if (variableInputs.length === 0) {
      return [{ id: 'input', position: '-80px' }]; 
    }
    
    return variableInputs;
  }, [text]);

  return (
      <BaseNode
          id={id}
          type="output"
          title="Output Node"
          icon={<Type className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
          onDeleteNode={data?.onDeleteNode}
      >
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-template`} className="text-sm font-medium text-slate-700">
              Template
            </Label>
            <Textarea
                ref={textareaRef}
                id={`${id}-template`}
                placeholder={INPUT_PLACEHOLDERS.textTemplate}
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full resize-none overflow-hidden"
                style={{ minHeight: '80px' }}
            />
          </div>
        </div>
      </BaseNode>
  );
});

OutputNode.displayName = 'OutputNode';

export default OutputNode;
