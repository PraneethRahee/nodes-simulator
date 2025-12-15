import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Download } from 'lucide-react';

const InputNode = ({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Input ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          type="input"
          title="Input Node"
          icon={<Download className="w-4 h-4" />}
          outputs={[{ id: 'output' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-fieldname`} className="text-xs font-medium text-slate-700">
              Field Name
            </Label>
            <Input
                id={`${id}-fieldname`}
                placeholder="Enter field name"
                defaultValue={data?.fieldName || 'user_input'}
                onChange={(e) => handleInputChange('fieldName', e.target.value)}
                className="w-full text-sm"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-type`} className="text-xs font-medium text-slate-700">
              Type
            </Label>
            <Select defaultValue={data?.inputType || 'text'}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="file">File</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </BaseNode>
  );
};

export default InputNode;

