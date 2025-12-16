import InputNode from './InputNode.jsx';
import OutputNode from './OutputNode.jsx';
import TextNode from './TextNode.jsx';
import LLMNode from './LLMNode.jsx';
import EmailNode from './EmailNode.jsx';
import LoggerNode from './LoggerNode.jsx';
import MathNode from './MathNode.jsx';
import DelayNode from './DelayNode.jsx';
import ConditionNode from './ConditionNode.jsx';

export const nodeTypes = {
  input: (props) => <InputNode {...props} />,
  output: (props) => <OutputNode {...props} />,
  text: (props) => <TextNode {...props} />,
  llm: (props) => <LLMNode {...props} />,
  email: (props) => <EmailNode {...props} />,
  logger: (props) => <LoggerNode {...props} />,
  condition: (props) => <ConditionNode {...props} />,
  math: (props) => <MathNode {...props} />,
  delay: (props) => <DelayNode {...props} />,

};
