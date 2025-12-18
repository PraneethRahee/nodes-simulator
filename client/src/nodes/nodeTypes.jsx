import React, { lazy, Suspense } from 'react';

// Lazy load node components to reduce initial bundle size
const InputNode = lazy(() => import('./InputNode.jsx'));
const OutputNode = lazy(() => import('./OutputNode.jsx'));
const TextNode = lazy(() => import('./TextNode.jsx'));
const LLMNode = lazy(() => import('./LLMNode.jsx'));
const EmailNode = lazy(() => import('./EmailNode.jsx'));
const LoggerNode = lazy(() => import('./LoggerNode.jsx'));
const MathNode = lazy(() => import('./MathNode.jsx'));
const DelayNode = lazy(() => import('./DelayNode.jsx'));
const ConditionNode = lazy(() => import('./ConditionNode.jsx'));

const withNodeDelete = (NodeComponent) => {
  const WithDeleteNode = React.memo((props) => {
    const handleNodeDelete = React.useCallback((nodeId) => {
      console.log(`${NodeComponent.name} onDeleteNode called with nodeId: ${nodeId}`);
      if (props.onDeleteNode) {
        props.onDeleteNode(nodeId);
      }
    }, [props.onDeleteNode]);
    
    return <NodeComponent {...props} onDeleteNode={handleNodeDelete} />;
  });
  
  WithDeleteNode.displayName = `WithDeleteNode(${NodeComponent.name})`;
  
  return WithDeleteNode;
};

const createLazyNodeType = (NodeComponent) => {
  const LazyNodeComponent = withNodeDelete(NodeComponent);
  return React.memo((props) => (
    <Suspense fallback={<div className="w-80 h-40 bg-slate-100 animate-pulse rounded-lg" />}>
      <LazyNodeComponent {...props} />
    </Suspense>
  ));
};

export const nodeTypes = {
  input: createLazyNodeType(InputNode),
  output: createLazyNodeType(OutputNode),
  text: createLazyNodeType(TextNode),
  llm: createLazyNodeType(LLMNode),
  email: createLazyNodeType(EmailNode),
  logger: createLazyNodeType(LoggerNode),
  condition: createLazyNodeType(ConditionNode),
  math: createLazyNodeType(MathNode),
  delay: createLazyNodeType(DelayNode),
};
