import GradientCircle from "./GradientCircle"

function AxisInfoCard({
    axis,
    title,
    desc,
    concept
}) {
    return (
        <div className="
            min-[769px]:pl-[24px]
        ">
            <div className="
                w-full max-w-[551px] shrink min-w-0 max-[990px]:max-w-none max-[990px]:shrink-0
                min-[769px]:px-[50px] min-[769px]:py-[30px] 
                max-[768px]:px-[16px] max-[768px]:py-[24px]
                relative 
                rounded-[12px] 
                border border-[#C1D9FF] 
                bg-white/60 
                shadow-[0_0_12px_0_rgba(193,217,255,0.70)]
                backdrop-blur-sm
                flex flex-col
                gap-[10px]
            ">
                <GradientCircle className="max-[768px]:hidden absolute top-[50%] left-0 translate-x-[-50%] translate-y-[-50%] z-10">
                    <span className="text-white font-[600] text-[24px]">{axis}</span>
                </GradientCircle>
                <div className="flex items-center gap-[8px]">
                    <GradientCircle className="min-[769px]:hidden">
                        <span className="text-white font-[600] text-[24px]">{axis}</span>
                    </GradientCircle>
                    <h4 className="text-[#000] font-[600] text-[20px] max-[768px]:text-[16px]">{title}</h4>
                </div>
                <p className="text-[#000] font-[400] text-[16px] max-[768px]:text-[15px] leading-[120%] min-[769px]:mb-[2px]">{desc}</p>
                <p className="text-[#717171] font-[400] text-[16px] max-[768px]:text-[15px] leading-[140%] whitespace-pre-line">
                    {concept}
                </p>
            </div>
        </div>
    )
}

export default AxisInfoCard