import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { selectNodesCount, setError } from '@/store';
import { submitPipeline } from '@/store/thunks';

const FlowControls = React.memo(() => {
  const dispatch = useDispatch();
  const nodesCount = useSelector(selectNodesCount);
  
  const handleSubmit = useCallback(async () => {
    try {
      const result = await dispatch(submitPipeline());

      if (!result) {
        dispatch(setError("Backend not reachable"));
        return;
      }
    } catch (error) {
      dispatch(setError(error.message || "An error occurred during submission"));
    }
  }, [dispatch]);

  return (
    <div className="absolute bottom-4 left-4 right-4 flex justify-center">
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={nodesCount === 0}
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