import React, { useState, useRef, useEffect } from 'react';

function EvaluationStep({ step, color, title, desc, marginBottom }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [forceWrap, setForceWrap] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const containerWidth = entry.contentRect.width;
                const textWidth = textRef.current.scrollWidth;
                
                if (containerWidth < textWidth + 5) {
                    setForceWrap(true);
                } else {
                    setForceWrap(false);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const naturalDesc = desc.replace(/\n/g, ' ');

    return (
        <div className={`flex items-start gap-[113px] ${marginBottom}`}>
            <div className="flex items-center gap-[10px] w-[80px] shrink-0 h-[24px]">
                <div
                    className="w-[16px] h-[16px] max-[768px]:w-[12px] max-[768px]:h-[12px] rounded-full z-10 shrink-0"
                    style={{ backgroundColor: color }}
                />
                <span className="text-[#717171] font-[400] text-[16px] max-[768px]:text-[14px] whitespace-nowrap">
                    {step}
                </span>
            </div>

            <div className="flex flex-col flex-1 min-w-0 relative" ref={containerRef}>
                <h3 className="text-[#000000] text-[20px] max-[768px]:text-[16px] font-[500] mb-[12px] leading-none">
                    {title}
                </h3>
                <p className={`text-[#000000] text-[16px] max-[768px]:text-[15px] font-[400] leading-[150%] break-keep ${forceWrap ? 'whitespace-normal' : 'whitespace-pre'}`}>
                    {forceWrap ? naturalDesc : desc}
                </p>
                <p 
                    ref={textRef} 
                    className="text-[16px] font-[400] leading-[150%] whitespace-pre absolute opacity-0 pointer-events-none w-max max-w-none left-0 top-0"
                    aria-hidden="true"
                    style={{ zIndex: -100 }}
                >
                    {desc}
                </p>
            </div>
        </div>
    );
}

export default EvaluationStep;
