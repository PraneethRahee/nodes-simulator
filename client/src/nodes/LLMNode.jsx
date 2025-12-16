import React, { useState, useCallback } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Expand, Maximize2, HelpCircle, Brain } from 'lucide-react';
import { NODE_DEFAULTS } from '../constants/nodeDefaults.js';
import { LLM_MODELS } from '../constants/selectOptions.js';

const outputs = [{ id: 'output', position: '240px' }]; 
const inputs = [{ id: 'input', position: '-180px' }];
const LLMNode = React.memo(({ id, data, isConnectable }) => {
  
  const [systemInstructions, setSystemInstructions] = useState(data?.systemInstructions || NODE_DEFAULTS.llm.systemInstructions);
  const [prompt, setPrompt] = useState(data?.prompt || NODE_DEFAULTS.llm.prompt);
  const [model, setModel] = useState(data?.model || NODE_DEFAULTS.llm.model);
  const [usePersonalKey, setUsePersonalKey] = useState(data?.usePersonalKey || NODE_DEFAULTS.llm.usePersonalKey);

  const handleModelChange = useCallback((value) => {
    setModel(value);
    console.log(`LLM ${id} model changed to:`, value);
  }, [id]);

  const handleSystemInstructionsChange = useCallback((value) => {
    setSystemInstructions(value);
    console.log(`LLM ${id} system instructions changed to:`, value);
  }, [id]);

  const handlePromptChange = useCallback((value) => {
    setPrompt(value);
    console.log(`LLM ${id} prompt changed to:`, value);
  }, [id]);

  const handleUsePersonalKeyChange = useCallback((checked) => {
    setUsePersonalKey(checked);
    console.log(`LLM ${id} use personal key changed to:`, checked);
  }, [id]);


  return (
      <BaseNode
          id={id}
          type="llm"
          title="OpenAI"
          icon={<Brain className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={`${id}-system`} className="text-sm font-medium text-slate-700">
                  System (Instructions)
                </Label>
                <HelpCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                  <Expand className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                  Text
                </Button>
              </div>
            </div>
            <Textarea
                id={`${id}-system`}
                value={systemInstructions}
                onChange={(e) => handleSystemInstructionsChange(e.target.value)}
                className="min-h-[60px] resize-none"
                placeholder="Answer the question based on context"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={`${id}-prompt`} className="text-sm font-medium text-slate-700">
                  Prompt
                </Label>
                <HelpCircle className="h-4 w-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                  <Expand className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                  Text
                </Button>
              </div>
            </div>
            <Textarea
                id={`${id}-prompt`}
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                className="min-h-[100px] resize-none"
                placeholder="Question :\n\nContext :"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor={`${id}-model`} className="text-sm font-medium text-slate-700">
                Model
              </Label>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <Select value={model} onValueChange={handleModelChange}>
              <SelectTrigger className="bg-blue-50 border-blue-200">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {LLM_MODELS.map(model => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor={`${id}-personal-key`} className="text-sm font-medium text-slate-700">
                Use Personal API Key
              </Label>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <Switch
                id={`${id}-personal-key`}
                checked={usePersonalKey}
                onCheckedChange={handleUsePersonalKeyChange}
            />
          </div>
        </div>
      </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';

export default LLMNode;
