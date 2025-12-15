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
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  email: EmailNode,
  logger: LoggerNode,
  condition: ConditionNode,
  math: MathNode,
  delay: DelayNode,

};
