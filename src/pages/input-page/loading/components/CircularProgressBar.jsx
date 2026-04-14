import { useState, useEffect, useRef } from "react";
import "./loading.css";

// expectedDuration(ms)에서 75% 도달 속도 역산
// frames = duration / 1000 * 60fps
// f = 1 - 0.25^(1/frames)  →  75% at expectedDuration
const DEFAULT_DURATION = 5000;
const COMPLETION_FACTOR = 0.1;
const MIN_FACTOR = 0.0005;
const MAX_FACTOR = 0.5;

function calcNormalFactor(durationMs) {
  const frames = Math.max((durationMs / 1000) * 60, 1);
  const f = 1 - Math.pow(0.25, 1 / frames);
  return Math.min(Math.max(f, MIN_FACTOR), MAX_FACTOR);
}

function CircularProgressBar({ completed = false, error = false, expectedDuration = DEFAULT_DURATION, onFull }) {
  const displayRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef(null);
  const normalFactor = calcNormalFactor(expectedDuration);

  // 마운트 시 연속 채우기 시작
  useEffect(() => {
    if (error || completed) return;

    const animate = () => {
      displayRef.current += (100 - displayRef.current) * normalFactor;
      setDisplayProgress(displayRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [error, completed, normalFactor]);

  // 완료 신호: COMPLETION_FACTOR로 가속하며 100%까지, 도달 시 onFull 호출
  useEffect(() => {
    if (!completed || error) return;
    cancelAnimationFrame(rafRef.current);
    let currentFactor = normalFactor;
    const animate = () => {
      currentFactor += (COMPLETION_FACTOR - currentFactor) * 0.05;
      const diff = 100 - displayRef.current;
      if (diff < 0.1) {
        displayRef.current = 100;
        setDisplayProgress(100);
        onFull?.();
        return;
      }
      displayRef.current += diff * currentFactor;
      setDisplayProgress(displayRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [completed, error, normalFactor, onFull]);

  const progressDeg = (displayProgress / 100) * 360;
  const isActive = !completed && !error;

  return (
    <div
      className={`relative w-[36px] h-[36px] max-[893px]:w-[24px] max-[893px]:h-[24px] rounded-full flex items-center justify-center shrink-0 ${isActive ? "animate-pulse-subtle" : ""}`}
      role="progressbar"
      aria-valuenow={Math.round(displayProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className="absolute inset-0 rounded-full" style={{ background: "#E8E8E8" }} />
      <div
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{
          background: error
            ? "#FF4D4F"
            : "conic-gradient(from 148.41deg at 50% 50%, #0057DF -120.96deg, #B9D4FF 92.97deg, #2876F1 155.49deg, #0057DF 239.04deg, #B9D4FF 452.97deg)",
          mask: `conic-gradient(from 0deg at 50% 50%, black 0deg, black ${progressDeg}deg, transparent ${progressDeg}deg)`,
          WebkitMask: `conic-gradient(from 0deg at 50% 50%, black 0deg, black ${progressDeg}deg, transparent ${progressDeg}deg)`,
        }}
      />
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="rounded-full bg-white w-[28px] h-[28px] max-[893px]:w-[18px] max-[893px]:h-[18px]" />
        {error && (
          <span className="absolute text-[10px] max-[893px]:text-[8px] font-bold text-[#FF4D4F]">!</span>
        )}
      </div>
    </div>
  );
}

export default CircularProgressBar;
