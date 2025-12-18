import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { submitPipeline } from "./submit.jsx";

const FlowControls = React.memo(({ nodes, edges, onAlert, onError }) => {
  // Memoized submit handler
  const handleSubmit = useCallback(async () => {
    try {
      const result = await submitPipeline(nodes, edges);

      if (!result) {
        onError("Backend not reachable");
        return;
      }

      onAlert(result);
    } catch (error) {
      onError(error.message || "An error occurred during submission");
    }
  }, [nodes, edges, onAlert, onError]);

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-center">
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={nodes.length === 0}
            >
              Submit Pipeline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

FlowControls.displayName = 'FlowControls';

export default FlowControls;