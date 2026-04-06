import React, { useState, useRef, useEffect } from 'react';

function ServiceCaseCard({ img, title, desc }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [forceWrap, setForceWrap] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const containerWidth = entry.contentRect.width;
                const textWidth = textRef.current.scrollWidth;
                
                // 5px buffer added to reliably trigger wrap before clipping
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

    // Change forced newlines to spaces for natural wrapping
    const naturalDesc = desc.replace(/\n/g, ' ');

    return (
        <div className="flex items-center gap-[65px]">
            <img src={img} alt={title} className="w-[103px] h-[103px] shrink-0" />
            <div className="flex flex-col gap-[12px] flex-1 min-w-0 relative" ref={containerRef}>
                <h3 className="text-[20px] max-[768px]:text-[16px] font-[500] leading-[120%]">{title}</h3>
                
                {/* Visible responsive text */}
                <p className={`text-[16px] max-[768px]:text-[15px] font-[400] leading-[150%] break-keep ${forceWrap ? 'whitespace-normal' : 'whitespace-pre'}`}>
                    {forceWrap ? naturalDesc : desc}
                </p>

                {/* Hidden absolute text used solely for measuring original unbreakable width */}
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

export default ServiceCaseCard;