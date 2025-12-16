export const MATH_OPERATIONS = Object.freeze([
  { value: 'add', label: 'Add (+)' },
  { value: 'subtract', label: 'Subtract (-)' },
  { value: 'multiply', label: 'Multiply (×)' },
  { value: 'divide', label: 'Divide (÷)' },
  { value: 'power', label: 'Power (^)' },
  { value: 'modulo', label: 'Modulo (%)' }
]);

export const LOGGER_LEVELS = Object.freeze([
  { value: 'debug', label: 'Debug' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warning' },
  { value: 'error', label: 'Error' }
]);

export const INPUT_TYPES = Object.freeze([
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'file', label: 'File' },
  { value: 'boolean', label: 'Boolean' }
]);

export const TIME_UNITS = Object.freeze([
  { value: 'milliseconds', label: 'Milliseconds' },
  { value: 'seconds', label: 'Seconds' },
  { value: 'minutes', label: 'Minutes' },
  { value: 'hours', label: 'Hours' }
]);

export const CONDITION_OPERATORS = Object.freeze([
  { value: 'equals', label: 'Equals (==)' },
  { value: 'not-equals', label: 'Not Equals (!=)' },
  { value: 'greater', label: 'Greater Than (>)' },
  { value: 'less', label: 'Less Than (<)' },
  { value: 'greater-equal', label: 'Greater or Equal (>=)' },
  { value: 'less-equal', label: 'Less or Equal (<=)' },
  { value: 'contains', label: 'Contains' }
]);

export const LLM_MODELS = Object.freeze([
  { value: 'gpt-4.1', label: 'gpt-4.1' },
  { value: 'gpt-4', label: 'gpt-4' },
  { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
  { value: 'claude-3', label: 'claude-3' }
]);