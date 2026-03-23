import { useEffect, useRef } from "react";
import CompleteIcon from "../components/CompleteIcon";
import CircularProgressBar from "../components/CircularProgressBar";

function AnalysisStateSection({ completed, error, progress, title, items }) {
    const sectionRef = useRef(null);

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
            className="w-full flex gap-5 transition-all duration-500 ease-out items-start"
            style={{ opacity: 0, transform: "translateY(12px)" }}
        >
            <div className="flex items-center h-[36px] max-[893px]:h-[24px] shrink-0">
                {completed ? (
                    <CompleteIcon />
                ) : (
                    <CircularProgressBar progress={progress} error={error} />
                )}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center h-[36px] max-[893px]:h-[24px]">
                    <h3 className="text-[24px] max-[893px]:text-[16px] font-[500] leading-none">
                        {title}
                    </h3>
                </div>
                {!completed &&
                    items.map((item) => (
                        <p
                            key={item}
                            className="text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400] animate-fade-in mt-[6px]"
                        >
                            {item}
                        </p>
                    ))}
            </div>
        </div>
    );
}

export default AnalysisStateSection;