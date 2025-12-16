import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { GitBranch } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';
import { CONDITION_OPERATORS } from '../constants/selectOptions.js';

// Memoize static inputs and outputs arrays to prevent recreation on every render
const inputs = [{ id: 'input', position: '70px' }];
const outputs = [
  { id: 'true', position: '50px' },
  { id: 'false', position: '90px' }
];

const ConditionNode = React.memo(({ id, data, isConnectable, selected }) => {
  const handleInputChange = (field, value) => {
    console.log(`Condition ${id} ${field} changed to:`, value);
  };


  return (
      <BaseNode
          id={id}
          data={data}
          type="condition"
          title="Condition Node"
          icon={<GitBranch className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
          className={selected ? 'ring-2 ring-blue-500' : ''}
      >
        <div className="space-y-3" onMouseDown={(e) => e.stopPropagation()}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-operator`} className="text-xs font-medium text-slate-700">
              Operator
            </Label>
            <Select defaultValue={data?.operator || NODE_DEFAULTS.condition.operator} onValueChange={(value) => handleInputChange('operator', value)}>
              <SelectTrigger className="w-full" onMouseDown={(e) => e.stopPropagation()}>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_OPERATORS.map(op => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-value`} className="text-xs font-medium text-slate-700">
              Compare Value
            </Label>
            <Input
                id={`${id}-value`}
                placeholder={INPUT_PLACEHOLDERS.compareValue}
                defaultValue={data?.value || NODE_DEFAULTS.condition.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-full text-sm"
            />
          </div>
        </div>
      </BaseNode>
  );
});

ConditionNode.displayName = 'ConditionNode';

export default ConditionNode;
