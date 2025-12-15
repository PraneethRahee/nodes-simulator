import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Calculator } from 'lucide-react';

const MathNode = ({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Math ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          type="math"
          title="Math Node"
          icon={<Calculator className="w-4 h-4" />}
          inputs={[
            { id: 'input-a', position: '70px' },
            { id: 'input-b', position: '105px' }
          ]}
          outputs={[{ id: 'output' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-operation`} className="text-sm font-medium text-slate-700">
              Operation
            </Label>
            <Select defaultValue={data?.operation || 'add'} onValueChange={(value) => handleInputChange('operation', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
                <SelectItem value="multiply">Multiply (×)</SelectItem>
                <SelectItem value="divide">Divide (÷)</SelectItem>
                <SelectItem value="power">Power (^)</SelectItem>
                <SelectItem value="modulo">Modulo (%)</SelectItem>
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
                placeholder="2"
                defaultValue={data?.precision || '2'}
                onChange={(e) => handleInputChange('precision', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
};

export default MathNode;
