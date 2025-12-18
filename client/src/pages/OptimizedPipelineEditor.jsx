import React, { Suspense, lazy } from 'react';
import NodePalette from '@/components/NodePalette.jsx';

// Lazy load the optimized flow canvas
const OptimizedFlowCanvas = lazy(() => import('@/components/OptimizedFlowCanvas.jsx'));

const OptimizedPipelineEditor = () => {
  return (
      <div className="flex h-screen bg-slate-50">
        <NodePalette />
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="text-slate-600">Loading pipeline editor...</div>
          </div>
        }>
          <OptimizedFlowCanvas />
        </Suspense>
      </div>
  );
};

export default OptimizedPipelineEditor;