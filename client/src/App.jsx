import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PipelineEditor from "@/pages/PipelineEditor.jsx";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <PipelineEditor />
    </TooltipProvider>
  );
}

export default App;
