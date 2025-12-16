
export const NODE_DEFAULTS = Object.freeze({
  input: {
    fieldName: 'user_input',
    inputType: 'text'
  },
  math: {
    operation: 'add',
    precision: '2'
  },
  logger: {
    level: 'info',
    message: ''
  },
  email: {
    to: '',
    subject: ''
  },
  delay: {
    duration: '5',
    unit: 'seconds'
  },
  condition: {
    operator: 'equals',
    value: ''
  },
  llm: {
    systemInstructions: 'Answer the question based on context',
    prompt: 'Question :\n\nContext :',
    model: 'gpt-4.1',
    usePersonalKey: false
  },
  text: {
    text: ''
  },
  output: {
    text: ''
  }
});

export const INPUT_PLACEHOLDERS = Object.freeze({
  fieldName: 'Enter field name',
  emailTo: 'recipient@example.com',
  emailSubject: 'Email subject',
  logMessage: 'Log message',
  compareValue: 'Value to compare',
  duration: '5',
  precision: '2',
  textTemplate: 'Enter text template'
});