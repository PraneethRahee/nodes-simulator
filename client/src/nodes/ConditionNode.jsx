import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { GitBranch } from 'lucide-react';

const ConditionNode = ({ id, data, isConnectable, selected }) => {
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
          inputs={[{ id: 'input' }]}
          outputs={[
            { id: 'true', position: '30%' },
            { id: 'false', position: '70%' }
          ]}
          isConnectable={isConnectable}
          className={selected ? 'ring-2 ring-blue-500' : ''}
      >
        <div className="space-y-3" onMouseDown={(e) => e.stopPropagation()}>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-operator`} className="text-xs font-medium text-slate-700">
              Operator
            </Label>
            <Select defaultValue={data?.operator || 'equals'} onValueChange={(value) => handleInputChange('operator', value)}>
              <SelectTrigger className="w-full" onMouseDown={(e) => e.stopPropagation()}>
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equals">Equals (==)</SelectItem>
                <SelectItem value="not-equals">Not Equals (!=)</SelectItem>
                <SelectItem value="greater">Greater Than (&gt;)</SelectItem>
                <SelectItem value="less">Less Than (&lt;)</SelectItem>
                <SelectItem value="greater-equal">Greater or Equal (&gt;=)</SelectItem>
                <SelectItem value="less-equal">Less or Equal (&lt;=)</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-value`} className="text-xs font-medium text-slate-700">
              Compare Value
            </Label>
            <Input
                id={`${id}-value`}
                placeholder="Value to compare"
                defaultValue={data?.value || ''}
                onChange={(e) => handleInputChange('value', e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-full text-sm"
            />
          </div>
        </div>
      </BaseNode>
  );
};

export default ConditionNode;
