import React, { useCallback } from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Download } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';
import { INPUT_TYPES } from '../constants/selectOptions.js';

const outputs = [{ id: 'output' }]; 

const InputNode = React.memo(({ id, data, isConnectable }) => {
  const handleInputChange = useCallback((field, value) => {
    console.log(`Input ${id} ${field} changed to:`, value);
  }, [id]);

  return (
      <BaseNode
          id={id}
          type="input"
          title="Input Node"
          icon={<Download className="w-4 h-4" />}
          outputs={outputs}
          isConnectable={isConnectable}
          onDeleteNode={data?.onDeleteNode}
      >
        <div className="space-y-3">
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-fieldname`} className="text-xs font-medium text-slate-700">
              Field Name
            </Label>
            <Input
                id={`${id}-fieldname`}
                placeholder={INPUT_PLACEHOLDERS.fieldName}
                defaultValue={data?.fieldName || NODE_DEFAULTS.input.fieldName}
                onChange={(e) => handleInputChange('fieldName', e.target.value)}
                className="w-full text-sm"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor={`${id}-type`} className="text-xs font-medium text-slate-700">
              Type
            </Label>
            <Select 
                defaultValue={data?.inputType || NODE_DEFAULTS.input.inputType}
                onValueChange={(value) => handleInputChange('inputType', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {INPUT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </BaseNode>
  );
});

InputNode.displayName = 'InputNode';

export default InputNode;
