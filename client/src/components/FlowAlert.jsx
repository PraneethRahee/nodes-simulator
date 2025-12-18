import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';

const FlowAlert = React.memo(({ show, alertData, alertTitleStyles, onClose }) => {
  if (!show || !alertData) return null;

  return (
    <AlertDialog open={show} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              alertData.isValidDAG ? alertTitleStyles.validDAG : alertTitleStyles.invalidDAG
            }`}>
              {alertData.isValidDAG ? (
                <div className="w-4 h-4 bg-emerald-600 rounded-full" />
              ) : (
                <div className="w-4 h-4 bg-red-600 rounded-full" />
              )}
            </div>
            Pipeline Validation Results
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Nodes:</span>
              <span className="font-semibold text-slate-800">{alertData.nodeCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Edges:</span>
              <span className="font-semibold text-slate-800">{alertData.edgeCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">DAG Status:</span>
              <span className={`font-semibold ${
                alertData.isValidDAG ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {alertData.isValidDAG ? 'Valid' : 'Invalid'}
              </span>
            </div>
            {alertData.error && (
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Error:</span>
                <span className="font-semibold text-red-600">{alertData.error}</span>
              </div>
            )}
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

FlowAlert.displayName = 'FlowAlert';

export default FlowAlert;