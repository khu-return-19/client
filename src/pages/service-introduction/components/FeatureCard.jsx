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
            min-[991px]:w-[438px] max-[990px]:w-full
            h-fit
            min-[769px]:pl-[23px]
            min-[769px]:pt-[23px]
            max-[768px]:pt-[16px]
            box-content
        "
            {...(concept ? { onClick: handleClick, style: { cursor: "pointer" } } : {})}
        >
            <div className="
                w-full
                min-[769px]:p-[32px]
                max-[768px]:pt-[30px] max-[768px]:px-[16px] max-[768px]:pb-[16px]
                relative 
                rounded-[12px] 
                border border-[#C1D9FF] 
                bg-white/60 
                shadow-[0_0_12px_0_rgba(193,217,255,0.70)]
                backdrop-blur-sm
                h-full
            ">
                <GradientCircle className="absolute top-0 left-0 min-[769px]:translate-x-[-50%] max-[768px]:translate-x-[16px] translate-y-[-50%] z-10">
                    <span className="text-white font-[600] text-[24px] max-[768px]:text-[16px]">{index}</span>
                </GradientCircle>
                <div className="mb-[20px] flex items-center justify-between">
                    <h4 className="text-[#000] font-[600] text-[20px] max-[768px]:text-[16px]">{title}</h4>
                    {concept && <img src={ArrowDownIcon} alt="확장" className={isExpanded ? "rotate-180" : ""} />}
                </div>
                <p className="text-[#000] font-[400] text-[16px] max-[768px]:text-[14px] leading-[150%] whitespace-pre-line">{desc}</p>
                {isExpanded && concept && (
                    <p className="text-[#747474] font-[400] text-[14px] max-[768px]:text-[13px] leading-[140%] mt-[24px] whitespace-pre-line">
                        {concept}
                    </p>
                )}
            </div>
        </div>
    )
}

export default FeatureCard