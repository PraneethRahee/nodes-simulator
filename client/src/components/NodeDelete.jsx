import React, { memo, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from './ui/alert-dialog';

const NodeDeleteButton = memo(({ nodeId, nodeTitle, onNodeDelete }) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setShowDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    onNodeDelete(nodeId);
    setShowDialog(false);
  }, [nodeId, onNodeDelete]);

  const handleCancel = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <button
        className="absolute top-2 right-2 bg-white border-2 border-red-500 rounded-full p-1 hover:bg-red-50 transition-colors cursor-pointer shadow-md opacity-100"
        style={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleDeleteClick}
        aria-label="Delete node"
      >
        <Trash2 className="w-3 h-3 text-red-500" />
      </button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              Delete Node
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p className="text-slate-600">
                Are you sure you want to delete this node? This action will remove the node and all its connections, and cannot be undone.
              </p>
              <div className="bg-slate-50 p-3 rounded-md">
                <p className="text-sm text-slate-500">
                  <strong>Node Title:</strong> {nodeTitle}
                </p>
                <p className="text-sm text-slate-500">
                  <strong>Node ID:</strong> {nodeId}
                </p>
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Node
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

NodeDeleteButton.displayName = 'NodeDeleteButton';

export default NodeDeleteButton;