import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail } from 'lucide-react';

const EmailNode = ({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Email ${id} ${field} changed to:`, value);
  };

  return (
      <BaseNode
          type="email"
          title="Email Node"
          icon={<Mail className="w-4 h-4" />}
          inputs={[{ id: 'input' }]}
          isConnectable={isConnectable}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor={`${id}-to`} className="text-sm font-medium text-slate-700">
              To
            </Label>
            <Input
                id={`${id}-to`}
                type="email"
                placeholder="recipient@example.com"
                defaultValue={data?.to || ''}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor={`${id}-subject`} className="text-sm font-medium text-slate-700">
              Subject
            </Label>
            <Input
                id={`${id}-subject`}
                placeholder="Email subject"
                defaultValue={data?.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
};

export default EmailNode;
