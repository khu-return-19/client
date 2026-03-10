import GradientCircle from "./GradientCircle"
import ArrowDownIcon from "../../../assets/icons/확장.svg"
import { useState } from "react"

function FeatureCard({
    index,
    title,
    desc,
    concept
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (concept) {
            setIsExpanded(!isExpanded);
        }
    }

    return (
        <div className="
            w-[436px] 
            pt-[31px] pb-[24px] px-[32px] 
            relative 
            rounded-[12px] 
            border border-[#C1D9FF] 
            bg-white/60 
            shadow-[0_0_12px_0_rgba(193,217,255,0.70)]
            backdrop-blur-sm
            h-fit
        "
            {...(concept ? { onClick: handleClick, style: { cursor: "pointer" } } : {})}
        >
            <GradientCircle className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] z-10">
                <span className="text-white font-[600] text-[24px]">{index}</span>
            </GradientCircle>
            <div className="mb-[20px] flex items-center justify-between">
                <h4 className="text-[#000] font-[600] text-[20px]">{title}</h4>
                {concept && <img src={ArrowDownIcon} alt="확장" className={isExpanded ? "rotate-180" : ""} />}
            </div>
            <p className="text-[#000] font-[400] text-[16px] leading-[150%] whitespace-pre-line">{desc}</p>
            {isExpanded && concept && (
                <p className="text-[#747474] font-[400] text-[12px] leading-[140%] mt-[10px] mb-[16px] whitespace-pre-line">
                    {concept}
                </p>
            )}
        </div>
    )
}

export default FeatureCard