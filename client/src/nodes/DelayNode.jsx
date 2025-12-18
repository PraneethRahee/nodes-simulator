import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Clock } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';
import { TIME_UNITS } from '../constants/selectOptions.js';

const outputs = [{ id: 'output', position: '120px' }]; 

const inputs = [{ id: 'input', position: '-80px' }];

const DelayNode = React.memo(({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Delay ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          id={id}
          type="delay"
          title="Delay Node"
          icon={<Clock className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
          onDeleteNode={data?.onDeleteNode}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-duration`} className="text-sm font-medium text-slate-700">
              Duration
            </Label>
            <Input
                id={`${id}-duration`}
                type="number"
                placeholder={INPUT_PLACEHOLDERS.duration}
                defaultValue={data?.duration || NODE_DEFAULTS.delay.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`${id}-unit`} className="text-sm font-medium text-slate-700">
              Unit
            </Label>
            <Select defaultValue={data?.unit || NODE_DEFAULTS.delay.unit} onValueChange={(value) => handleInputChange('unit', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {TIME_UNITS.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </BaseNode>
  );
});

DelayNode.displayName = 'DelayNode';

export default DelayNode;
