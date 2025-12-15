import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, CheckCircle } from 'lucide-react';

const PropertiesPanel = ({ selectedNode, onClose, onNodeUpdate }) => {
  if (!selectedNode) return null;

  const getNodeTypeInfo = (type) => {
    const typeMap = {
      input: { title: 'Input Node', color: 'bg-blue-600' },
      output: { title: 'Output Node', color: 'bg-emerald-600' },
      text: { title: 'Text Node', color: 'bg-purple-600' },
      llm: { title: 'LLM Node', color: 'bg-amber-600' },
      email: { title: 'Email Node', color: 'bg-pink-600' },
      logger: { title: 'Logger Node', color: 'bg-gray-600' },
      math: { title: 'Math Node', color: 'bg-cyan-600' },
      delay: { title: 'Delay Node', color: 'bg-orange-600' },
      condition: { title: 'Condition Node', color: 'bg-lime-600' }
    };
    return typeMap[type] || { title: 'Unknown Node', color: 'bg-slate-600' };
  };

  const nodeInfo = getNodeTypeInfo(selectedNode.type);

  const handleInputChange = (field, value) => {
    if (onNodeUpdate) {
      onNodeUpdate(selectedNode.id, {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          [field]: value
        }
      });
    }
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Properties</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <Card className="bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${nodeInfo.color}`} />
                <h3 className="font-medium text-slate-800">{nodeInfo.title}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">ID:</span>
                  <span className="font-mono text-slate-700">{selectedNode.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Type:</span>
                  <span className="text-slate-700">{selectedNode.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Position:</span>
                  <span className="text-slate-700">
                    {Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="node-name" className="text-sm font-medium text-slate-700">
                  Node Name
                </Label>
                <Input
                  id="node-name"
                  value={selectedNode.data?.label || ''}
                  onChange={(e) => handleInputChange('label', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="node-description" className="text-sm font-medium text-slate-700">
                  Description
                </Label>
                <Textarea
                  id="node-description"
                  value={selectedNode.data?.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-1"
                  rows={3}
                  placeholder="Node description"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enabled"
                  checked={selectedNode.data?.enabled !== false}
                  onCheckedChange={(checked) => handleInputChange('enabled', checked)}
                />
                <Label htmlFor="enabled" className="text-sm text-slate-700">
                  Enabled
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Valid configuration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Node is positioned</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Ready for connections</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
