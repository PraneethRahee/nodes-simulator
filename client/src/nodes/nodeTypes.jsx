import InputNode from './InputNode.jsx';
import OutputNode from './OutputNode.jsx';
import TextNode from './TextNode.jsx';
import LLMNode from './LLMNode.jsx';
import EmailNode from './EmailNode.jsx';
import LoggerNode from './LoggerNode.jsx';
import MathNode from './MathNode.jsx';
import DelayNode from './DelayNode.jsx';
import ConditionNode from './ConditionNode.jsx';

// Create a higher-order component that adds the delete handler to any node type
const withNodeDelete = (NodeComponent) => {
  const WithDeleteNode = (props) => {
    const handleNodeDelete = (nodeId) => {
      console.log(`${NodeComponent.name} onDeleteNode called with nodeId: ${nodeId}`);
      if (props.onDeleteNode) {
        props.onDeleteNode(nodeId);
      }
    };
    
    return <NodeComponent {...props} onDeleteNode={handleNodeDelete} />;
  };
  
  WithDeleteNode.displayName = `WithDeleteNode(${NodeComponent.name})`;
  
  return WithDeleteNode;
};

export const nodeTypes = {
  input: withNodeDelete(InputNode),
  output: withNodeDelete(OutputNode),
  text: withNodeDelete(TextNode),
  llm: withNodeDelete(LLMNode),
  email: withNodeDelete(EmailNode),
  logger: withNodeDelete(LoggerNode),
  condition: withNodeDelete(ConditionNode),
  math: withNodeDelete(MathNode),
  delay: withNodeDelete(DelayNode),
};
