import React from 'react';
import BaseNode from '../components/BaseNode.jsx';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail } from 'lucide-react';
import { NODE_DEFAULTS, INPUT_PLACEHOLDERS } from '../constants/nodeDefaults.js';

const EmailNode = React.memo(({ id, data, isConnectable }) => {
  const handleInputChange = (field, value) => {
    console.log(`Email ${id} ${field} changed to:`, value);
  };

  const inputs = [{ id: 'input', position: '70px' }];
  const outputs = [{ id: 'output', position: '70px' }];

  return (
      <BaseNode
          type="email"
          title="Email Node"
          icon={<Mail className="w-4 h-4" />}
          inputs={inputs}
          outputs={outputs}
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
                placeholder={INPUT_PLACEHOLDERS.emailTo}
                defaultValue={data?.to || NODE_DEFAULTS.email.to}
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
                placeholder={INPUT_PLACEHOLDERS.emailSubject}
                defaultValue={data?.subject || NODE_DEFAULTS.email.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="mt-1"
            />
          </div>
        </div>
      </BaseNode>
  );
});

EmailNode.displayName = 'EmailNode';

export default EmailNode;
