import { useRef, useEffect, useState } from 'react';
export const useNodeHeight = (defaultPosition = 70, handleCount = 1) => {
  const nodeRef = useRef(null);
  const [nodeHeight, setNodeHeight] = useState(0);
  const [handlePositions, setHandlePositions] = useState([]);

  useEffect(() => {
    const calculateHeight = () => {
      if (nodeRef.current) {
        const height = nodeRef.current.offsetHeight;
        setNodeHeight(height);
        if (handleCount === 1) {
          setHandlePositions([height / 2]);
        } else if (handleCount > 1) {
          const positions = [];
          const spacing = height / (handleCount + 1);
          for (let i = 1; i <= handleCount; i++) {
            positions.push(spacing * i);
          }
          setHandlePositions(positions);
        }
      }
    };
    
    calculateHeight();
    
    const resizeObserver = new ResizeObserver(() => {
      calculateHeight();
    });

    if (nodeRef.current) {
      resizeObserver.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) {
        resizeObserver.unobserve(nodeRef.current);
      }
    };
  }, [handleCount]);
  
  const positions = handlePositions.length > 0 ? handlePositions : [defaultPosition];

  return {
    nodeRef,
    height: nodeHeight,
    positions: handleCount === 1 ? positions[0] : positions,
    getSinglePosition: () => positions[0] || defaultPosition,
    getMultiplePositions: () => handleCount > 1 ? positions : [defaultPosition]
  };
};