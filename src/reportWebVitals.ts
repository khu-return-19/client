interface Metric {
  id: string;
  name: "CLS" | "FID" | "LCP" | "TTFB" | "FCP";
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  navigationType: "navigate" | "reload" | "back-forward" | "prerender";
  startTime: number;
}

type ReportCallback = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then((module) => {
      const webVitalsModule = (module as any).default || module;
      const { onCLS, onFID, onFCP, onLCP, onTTFB } = webVitalsModule;
      if (onCLS && onFID && onFCP && onLCP && onTTFB) {
        onCLS(onPerfEntry);
        onFID(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      }
    });
  }
};

export default reportWebVitals;
