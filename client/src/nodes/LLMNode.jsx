import React, { useState } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Expand, Maximize2, HelpCircle, Brain } from 'lucide-react';

const LLMNode = ({ id, data, isConnectable }) => {
  const [systemInstructions, setSystemInstructions] = useState(data?.systemInstructions || 'Answer the question based on context');
  const [prompt, setPrompt] = useState(data?.prompt || 'Question :\n\nContext :');
  const [model, setModel] = useState(data?.model || 'gpt-4.1');
  const [usePersonalKey, setUsePersonalKey] = useState(data?.usePersonalKey || false);

  const handleModelChange = (value) => {
    setModel(value);
    console.log(`LLM ${id} model changed to:`, value);
  };

  const handleSystemInstructionsChange = (value) => {
    setSystemInstructions(value);
    console.log(`LLM ${id} system instructions changed to:`, value);
  };

  const handlePromptChange = (value) => {
    setPrompt(value);
    console.log(`LLM ${id} prompt changed to:`, value);
  };

  const handleUsePersonalKeyChange = (checked) => {
    setUsePersonalKey(checked);
    console.log(`LLM ${id} use personal key changed to:`, checked);
  };

  return (
      <BaseNode
          type="llm"
          title="OpenAI"
          icon={<Brain className="w-4 h-4" />}
          inputs={[{ id: 'input' }]}
          outputs={[{ id: 'output' }]}
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
                <SelectItem value="gpt-4.1">gpt-4.1</SelectItem>
                <SelectItem value="gpt-4">gpt-4</SelectItem>
                <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                <SelectItem value="claude-3">claude-3</SelectItem>
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
};

export default LLMNode;
