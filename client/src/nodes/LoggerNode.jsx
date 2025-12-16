import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FileText } from 'lucide-react';
import { Input } from '../components/ui/input';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';
import { LOGGER_LEVELS } from '../constants/selectOptions.js';

const outputs = [{ id: 'output', position: '120px' }]; 
const inputs = [{ id: 'input', position: '-80px' }];
const LoggerNode = React.memo(({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Logger ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          id={id}
          type="logger"
          title="Logger Node"
          icon={<FileText className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-level`} className="text-sm font-medium text-slate-700">
              Log Level
            </Label>
            <Select defaultValue={data?.level || NODE_DEFAULTS.logger.level} onValueChange={(value) => handleInputChange('level', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {LOGGER_LEVELS.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`${id}-message`} className="text-sm font-medium text-slate-700">
              Message
            </Label>
            <Input
                id={`${id}-message`}
                placeholder={INPUT_PLACEHOLDERS.logMessage}
                defaultValue={data?.message || NODE_DEFAULTS.logger.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
});

LoggerNode.displayName = 'LoggerNode';

export default LoggerNode;
