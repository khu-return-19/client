import GradientCircle from "./GradientCircle"

function AxisInfoCard({
    axis,
    title,
    desc,
    concept
}) {
    return (
        <div className="
            w-[551px] 
            pt-[30px] pb-[30px] pl-[51px] 
            relative 
            rounded-[12px] 
            border border-[#C1D9FF] 
            bg-white/60 
            shadow-[0_0_12px_0_rgba(193,217,255,0.70)]
            backdrop-blur-sm
        ">
            <GradientCircle className="absolute top-[50%] left-0 translate-x-[-50%] translate-y-[-50%] z-10">
                <span className="text-white font-[600] text-[24px]">{axis}</span>
            </GradientCircle>
            <h4 className="text-[#000] font-[600] text-[20px] mb-[10px]">{title}</h4>
            <p className="text-[#000] font-[400] text-[16px] leading-[120%] mb-[12px]">{desc}</p>
            <p className="text-[#717171] font-[400] text-[16px] leading-[140%] whitespace-pre-line">
                {concept}
            </p>
        </div>
    )
}

export default AxisInfoCard