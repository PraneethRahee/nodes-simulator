
export const extractVariables = (text) => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const variableRegex = /\{\{([^}]+)\}\}/g;
  const variables = [];
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1].trim();
    if (variableName && !variables.includes(variableName)) {
      variables.push(variableName);
    }
  }

  return variables;
};


export const replaceVariables = (text, variableValues = {}) => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  return text.replace(/\{\{([^}]+)\}\}/g, (match, variableName) => {
    const cleanName = variableName.trim();
    return variableValues[cleanName] !== undefined 
      ? variableValues[cleanName] 
      : match;
  });
};


export const isValidVariableName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const validNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  return validNameRegex.test(name.trim());
};

export const getVariableStats = (text) => {
  const variables = extractVariables(text);
  const stats = {
    total: variables.length,
    unique: variables.length,
    variables: variables,
    usage: {}
  };

  variables.forEach(variable => {
    stats.usage[variable] = (stats.usage[variable] || 0) + 1;
  });

  return stats;
};

export const formatVariableForDisplay = (variableName) => {
  return `{{${variableName}}}`;
};

export const parseVariableAssignments = (text) => {
  const assignments = {};
  const lines = text.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.includes('=')) {
      const [key, value] = trimmed.split('=', 2);
      if (key && value) {
        assignments[key.trim()] = value.trim();
      }
    }
  });

  return assignments;
};
