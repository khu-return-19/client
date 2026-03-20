import { useState, useEffect, useRef } from "react";
import "./loading.css";

// 마운트 시점부터 시간 경과에 따라 100에 점근하는 속도로 채워짐
// completed 신호가 오면 빠르게 100%까지 채움
const NORMAL_FACTOR = 0.004;
const COMPLETION_FACTOR = 0.1;

function CircularProgressBar({ completed = false, error = false }) {
    const displayRef = useRef(0);
    const [displayProgress, setDisplayProgress] = useState(0);
    const rafRef = useRef(null);

    // 마운트 시 연속 채우기 시작
    useEffect(() => {
        if (error || completed) return;
        
        const animate = () => {
            displayRef.current += (100 - displayRef.current) * NORMAL_FACTOR;
            setDisplayProgress(displayRef.current);
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [error, completed]);

    // 완료 신호: NORMAL_FACTOR에서 COMPLETION_FACTOR로 부드럽게 가속하며 100%까지
    useEffect(() => {
        if (!completed || error) return;
        cancelAnimationFrame(rafRef.current);
        let currentFactor = NORMAL_FACTOR;
        const animate = () => {
            currentFactor += (COMPLETION_FACTOR - currentFactor) * 0.05;
            const diff = 100 - displayRef.current;
            if (diff < 0.1) {
                displayRef.current = 100;
                setDisplayProgress(100);
                return;
            }
            displayRef.current += diff * currentFactor;
            setDisplayProgress(displayRef.current);
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [completed, error]);

    const progressDeg = (displayProgress / 100) * 360;
    const isActive = !completed && !error;

    return (
        <div 
            className={`relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isActive ? "animate-pulse-subtle" : ""}`}
            role="progressbar"
            aria-valuenow={Math.round(displayProgress)}
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div
                className="absolute inset-0 rounded-full"
                style={{ background: "#E8E8E8" }}
            />
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
                <div className="inset-[3.6px] rounded-full bg-white w-[28px] h-[28px]" />
                {error && (
                    <span className="absolute text-[10px] font-bold text-[#FF4D4F]">!</span>
                )}
            </div>
        </div>
    );
}

export default CircularProgressBar;
