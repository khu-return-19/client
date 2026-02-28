function FeatureCard({
    index,
    title,
    desc,
    concept
}) {
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
        ">
            <div className="
                flex items-center justify-center 
                w-[45px] h-[45px] 
                rounded-full 
                bg-[linear-gradient(141deg,_#B9D4FF_19.81%,_#2876F1_53.21%,_#0057DF_82.62%)]
                absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] z-10
            ">
                <span className="text-white font-[600] text-[24px]">{index}</span>
            </div>
            <h4 className="text-[#000] font-[600] text-[20px] mb-[20px]">{title}</h4>
            <p className="text-[#000] font-[400] text-[16px] leading-[150%] whitespace-pre-line">{desc}</p>
            {concept && (
                <p className="text-[#747474] font-[400] text-[12px] leading-[140%] mt-[10px] mb-[16px] whitespace-pre-line">
                    {concept}
                </p>
            )}
        </div>
    )
}

export default FeatureCard