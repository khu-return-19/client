import { useEffect, useRef } from "react";
import CompleteIcon from "../components/CompleteIcon";
import LoadingSpinner from "../components/LoadingSpinner";

function AnalysisStateSection({ completed, title, items }) {
    const sectionRef = useRef(null);

    // 등장 시 fade-in 애니메이션
    useEffect(() => {
        if (sectionRef.current) {
            requestAnimationFrame(() => {
                sectionRef.current.style.opacity = "1";
                sectionRef.current.style.transform = "translateY(0)";
            });
        }
    }, []);

    return (
        <div
            ref={sectionRef}
            className="w-full flex gap-5 transition-all duration-500 ease-out"
            style={{ opacity: 0, transform: "translateY(12px)" }}
        >
            {completed ? <CompleteIcon /> : <LoadingSpinner />}
            <div className="flex flex-col gap-[6px]">
                <h3 className="text-[24px] font-[500] mb-[6px]">{title}</h3>
                {!completed &&
                    items.map((item, index) => (
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