import React, { memo, useCallback } from 'react';
import { X } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from './ui/alert-dialog';

const EdgeDeleteButton = memo(({ edgeId }) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setShowDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const event = new CustomEvent('deleteEdge', { detail: { edgeId } });
    document.dispatchEvent(event);
    setShowDialog(false);
  }, [edgeId]);

  const handleCancel = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <>
      <button
        className="absolute top-1/2 right-1/2 bg-white border border-red-500 rounded-full p-1 hover:bg-red-50 transition-colors cursor-pointer shadow-md opacity-0 hover:opacity-100 group-hover:opacity-100"
        style={{
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
        onClick={handleDeleteClick}
        aria-label="Delete edge"
      >
        <X className="w-3 h-3 text-red-500" />
      </button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-600" />
              </div>
              Delete Connection Path
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              <p className="text-slate-600">
                Are you sure you want to delete this connection path? This action will remove the connection between nodes and cannot be undone.
              </p>
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
              Delete Path
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

EdgeDeleteButton.displayName = 'EdgeDeleteButton';

export default EdgeDeleteButton;