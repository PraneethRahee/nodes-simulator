import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Calculator } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';
import { MATH_OPERATIONS } from '../constants/selectOptions.js';

  const outputs = [{ id: 'output', position: '120px' }]; 
    const inputs = [
    { id: 'input-a', position: '-100px' },
    { id: 'input-b', position: '-60px' }  
  ];
  const MathNode = React.memo(({ id, data, isConnectable }) => {

  const handleInputChange = (field, value) => {
    console.log(`Math ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          id={id}
          type="math"
          title="Math Node"
          icon={<Calculator className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-operation`} className="text-sm font-medium text-slate-700">
              Operation
            </Label>
            <Select defaultValue={data?.operation || NODE_DEFAULTS.math.operation} onValueChange={(value) => handleInputChange('operation', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                {MATH_OPERATIONS.map(op => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`${id}-precision`} className="text-sm font-medium text-slate-700">
              Precision
            </Label>
            <Input
                id={`${id}-precision`}
                type="number"
                placeholder={INPUT_PLACEHOLDERS.precision}
                defaultValue={data?.precision || NODE_DEFAULTS.math.precision}
                onChange={(e) => handleInputChange('precision', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
});

MathNode.displayName = 'MathNode';

export default MathNode;
