import React, { useState, useCallback, useRef, useEffect } from 'react';
import BaseNode from '@/components/BaseNode.jsx';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { extractVariables } from '@/utils/variableDetection';
import { Info } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';

const TextNode = React.memo(({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || NODE_DEFAULTS.text.text);
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

  const inputs = React.useMemo(() => {
    const detectedVariables = extractVariables(text);
    const variableCount = detectedVariables.length;

    const totalHeight = variableCount * 30;
    const startPosition = Math.max(60, Math.min(80, (200 - totalHeight) / 2));
    
    return detectedVariables.map((variable, index) => ({
      id: `var-${variable}`,
      label: variable,
      position: `${-startPosition*1.75 + (index * 20)}px`
    }));
  }, [text]);

  const outputs = [{ id: 'output' }];

  return (
    <BaseNode
      id={id}
      data={data}
      type="text"
      title="Text Node"
      inputs={inputs}
      outputs={outputs}
      isConnectable={isConnectable}
      onDeleteNode={data?.onDeleteNode}
      className="w-80"
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
