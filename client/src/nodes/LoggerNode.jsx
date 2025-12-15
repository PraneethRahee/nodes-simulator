import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FileText } from 'lucide-react';
import { Input } from '../components/ui/input';

const LoggerNode = ({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Logger ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          type="logger"
          title="Logger Node"
          icon={<FileText className="w-4 h-4" />}
          inputs={[{ id: 'input' }]}
          outputs={[{ id: 'output' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-level`} className="text-sm font-medium text-slate-700">
              Log Level
            </Label>
            <Select defaultValue={data?.level || 'info'} onValueChange={(value) => handleInputChange('level', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`${id}-message`} className="text-sm font-medium text-slate-700">
              Message
            </Label>
            <Input
                id={`${id}-message`}
                placeholder="Log message"
                defaultValue={data?.message || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
};

export default LoggerNode;
