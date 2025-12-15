export async function submitPipeline(nodes, edges) {
    const payload = {
        nodes: nodes.map(n => n.id),
        edges: edges.map(e => ({ source: e.source, target: e.target }))
    };

    console.log("Sending to backend:", payload);

    try {
        const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        console.log("Status:", res.status);
        if (!res.ok) throw new Error("Bad response");

        const result = await res.json();
        console.log("Backend returned:", result);
        return result;
    } catch (err) {
        console.error("Fetch failed:", err.message);
        return null;
    }
}
