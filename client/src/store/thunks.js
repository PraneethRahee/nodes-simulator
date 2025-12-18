import { deleteNode } from './nodesSlice';
import { deleteEdgesForNode } from './edgesSlice';
import { setLoading, setError, clearError, showAlert } from './uiSlice';

// Thunk for deleting a node and its connected edges
export const deleteNodeWithConnectedEdges = (nodeId) => (dispatch) => {
  try {
    dispatch(deleteNode(nodeId));
    dispatch(deleteEdgesForNode(nodeId));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Thunk for submitting pipeline
export const submitPipeline = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  
  try {
    const state = getState();
    const nodes = state.nodes.nodes;
    const edges = state.edges.edges;
    
    const payload = {
      nodes: nodes.map(n => n.id),
      edges: edges.map(e => ({ source: e.source, target: e.target }))
    };

    console.log("Sending to backend:", payload);

    const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    console.log("Status:", res.status);
    if (!res.ok) throw new Error("Bad response");

    const result = await res.json();
    console.log("Backend returned:", result);
    
    dispatch(showAlert(result));
    return result;
  } catch (error) {
    console.error("Fetch failed:", error.message);
    dispatch(setError(error.message || "An error occurred during submission"));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};