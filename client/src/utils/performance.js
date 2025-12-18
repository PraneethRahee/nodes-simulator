import React from 'react';

/**
 * Performance monitoring utilities for React components
 */

// Performance tracking state
const performanceMetrics = {
  componentRenders: new Map(),
  componentMountTimes: new Map(),
  renderTimes: new Map(),
};

/**
 * Measure component render time
 * @param {string} componentName - Name of the component
 * @param {Function} renderFn - Function to measure
 * @returns {*} - Result of the render function
 */
export const measureRender = (componentName, renderFn) => {
  const start = performance.now();
  const result = renderFn();
  const end = performance.now();
  const renderTime = end - start;

  // Track render count
  const currentCount = performanceMetrics.componentRenders.get(componentName) || 0;
  performanceMetrics.componentRenders.set(componentName, currentCount + 1);

  // Track render time
  const times = performanceMetrics.renderTimes.get(componentName) || [];
  times.push(renderTime);
  performanceMetrics.renderTimes.set(componentName, times);

  // Log slow renders
  if (renderTime > 16) { // More than one frame (60fps)
    console.warn(`🐌 ${componentName} took ${renderTime.toFixed(2)}ms to render`);
  }

  return result;
};

/**
 * Measure component mount time
 * @param {string} componentName - Name of the component
 * @param {Function} mountFn - Function to measure
 * @returns {*} - Result of the mount function
 */
export const measureMount = (componentName, mountFn) => {
  const start = performance.now();
  const result = mountFn();
  const end = performance.now();
  const mountTime = end - start;

  performanceMetrics.componentMountTimes.set(componentName, mountTime);

  console.log(`📊 ${componentName} mounted in ${mountTime.toFixed(2)}ms`);

  return result;
};

/**
 * Higher-order component for performance monitoring
 * @param {React.ComponentType} WrappedComponent - Component to wrap
 * @param {string} componentName - Name for tracking
 * @returns {React.ComponentType} - Wrapped component with monitoring
 */
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  const MonitoredComponent = React.memo((props) => {
    const renderCount = React.useRef(0);
    const lastRenderTime = React.useRef(performance.now());

    React.useEffect(() => {
      renderCount.current += 1;
      const now = performance.now();
      const timeSinceLastRender = now - lastRenderTime.current;
      
      if (renderCount.current > 1) {
        console.log(`🔄 ${componentName} re-rendered #${renderCount.current} after ${timeSinceLastRender.toFixed(2)}ms`);
      }
      
      lastRenderTime.current = now;
    });

    return measureRender(componentName, () => <WrappedComponent {...props} />);
  });

  MonitoredComponent.displayName = `withPerformanceMonitoring(${componentName})`;
  return MonitoredComponent;
};

/**
 * Hook for performance monitoring
 * @param {string} componentName - Name of the component
 * @returns {Object} - Performance monitoring utilities
 */
export const usePerformanceMonitor = (componentName) => {
  const renderCount = React.useRef(0);
  const mountTime = React.useRef(performance.now());

  React.useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    const timeSinceMount = currentTime - mountTime.current;
    
    if (renderCount.current > 1) {
      console.log(`🔄 ${componentName} rendered ${renderCount.current} times (${timeSinceMount.toFixed(2)}ms since mount)`);
    }
  });

  const logPerformance = React.useCallback((action) => {
    console.log(`⚡ ${componentName}: ${action}`);
  }, [componentName]);

  return {
    renderCount: renderCount.current,
    logPerformance,
  };
};

/**
 * Get performance metrics summary
 * @returns {Object} - Summary of all performance metrics
 */
export const getPerformanceMetrics = () => {
  const summary = {};

  // Component render counts
  summary.renderCounts = Object.fromEntries(performanceMetrics.componentRenders);

  // Average render times
  summary.averageRenderTimes = {};
  for (const [component, times] of performanceMetrics.renderTimes) {
    const average = times.reduce((sum, time) => sum + time, 0) / times.length;
    summary.averageRenderTimes[component] = average.toFixed(2);
  }

  // Mount times
  summary.mountTimes = Object.fromEntries(performanceMetrics.componentMountTimes);

  return summary;
};

/**
 * Log performance metrics summary
 */
export const logPerformanceSummary = () => {
  const metrics = getPerformanceMetrics();
  
  console.group('📊 Performance Metrics Summary');
  
  console.group('🔄 Render Counts');
  Object.entries(metrics.renderCounts).forEach(([component, count]) => {
    console.log(`${component}: ${count} renders`);
  });
  console.groupEnd();

  console.group('⏱️ Average Render Times');
  Object.entries(metrics.averageRenderTimes).forEach(([component, time]) => {
    const color = parseFloat(time) > 16 ? '🐌' : '✅';
    console.log(`${color} ${component}: ${time}ms`);
  });
  console.groupEnd();

  console.group('🚀 Mount Times');
  Object.entries(metrics.mountTimes).forEach(([component, time]) => {
    console.log(`${component}: ${time.toFixed(2)}ms`);
  });
  console.groupEnd();

  console.groupEnd();
};

/**
 * Clear all performance metrics
 */
export const clearPerformanceMetrics = () => {
  performanceMetrics.componentRenders.clear();
  performanceMetrics.componentMountTimes.clear();
  performanceMetrics.renderTimes.clear();
  console.log('🧹 Performance metrics cleared');
};

/**
 * Monitor memory usage
 * @returns {Object} - Memory usage information
 */
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: (performance.memory.usedJSHeapSize / 1048576).toFixed(2), // MB
      total: (performance.memory.totalJSHeapSize / 1048576).toFixed(2), // MB
      limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2), // MB
    };
  }
  return null;
};

/**
 * Log memory usage
 */
export const logMemoryUsage = () => {
  const memory = getMemoryUsage();
  if (memory) {
    console.log(`💾 Memory Usage: ${memory.used}MB / ${memory.total}MB (limit: ${memory.limit}MB)`);
  }
};

// Development-only performance monitoring
if (import.meta.env.DEV) {
  // Log performance metrics every 30 seconds in development
  setInterval(() => {
    logPerformanceSummary();
    logMemoryUsage();
  }, 30000);
}