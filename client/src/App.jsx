import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load the optimized pipeline editor
const OptimizedPipelineEditor = lazy(() => import('@/pages/OptimizedPipelineEditor.jsx'));

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-slate-50">
          <div className="text-slate-600">Loading Node Simulator...</div>
        </div>
      }>
        <OptimizedPipelineEditor />
      </Suspense>
    </TooltipProvider>
  );
}

export default App;
