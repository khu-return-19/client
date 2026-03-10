import { useState, useEffect, useRef } from "react";
import CompleteIcon from "../components/CompleteIcon";
import CircularProgressBar from "../components/CircularProgressBar";

const COMPLETE_ICON_DELAY = 700;

function AnalysisStateSection({ completed, title, items }) {
    const sectionRef = useRef(null);
    const [showComplete, setShowComplete] = useState(false);

    useEffect(() => {
        if (sectionRef.current) {
            requestAnimationFrame(() => {
                sectionRef.current.style.opacity = "1";
                sectionRef.current.style.transform = "translateY(0)";
            });
        }
    }, []);

    useEffect(() => {
        if (!completed) return;
        const timer = setTimeout(() => setShowComplete(true), COMPLETE_ICON_DELAY);
        return () => clearTimeout(timer);
    }, [completed]);

    return (
        <div
            ref={sectionRef}
            className="w-full flex gap-5 transition-all duration-500 ease-out"
            style={{ opacity: 0, transform: "translateY(12px)" }}
        >
            {showComplete ? (
                <CompleteIcon />
            ) : (
                <CircularProgressBar completed={completed} />
            )}
            <div className="flex flex-col gap-[6px]">
                <h3 className="text-[24px] font-[500] mb-[6px]">{title}</h3>
                {!completed &&
                    items.map((item) => (
                        <p
                            key={item}
                            className="text-[16px] text-[#717171] font-[400] animate-fade-in"
                        >
                            {item}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export default AnalysisStateSection;
