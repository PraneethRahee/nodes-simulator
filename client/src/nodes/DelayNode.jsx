import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Clock } from 'lucide-react';

const DelayNode = ({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Delay ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          type="delay"
          title="Delay Node"
          icon={<Clock className="w-4 h-4" />}
          inputs={[{ id: 'input' }]}
          outputs={[{ id: 'output' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-duration`} className="text-sm font-medium text-slate-700">
              Duration
            </Label>
            <Input
                id={`${id}-duration`}
                type="number"
                placeholder="5"
                defaultValue={data?.duration || '5'}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`${id}-unit`} className="text-sm font-medium text-slate-700">
              Unit
            </Label>
            <Select defaultValue={data?.unit || 'seconds'} onValueChange={(value) => handleInputChange('unit', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="milliseconds">Milliseconds</SelectItem>
                <SelectItem value="seconds">Seconds</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </BaseNode>
  );
};

export default DelayNode;
