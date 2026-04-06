function GradientCircle({ children, className = "" }) {
    return (
        <div
            className={`
                flex items-center justify-center 
                w-[46px] h-[46px] max-[768px]:w-[32px] max-[768px]:h-[32px] 
                rounded-full 
                bg-[linear-gradient(141deg,_#B9D4FF_19.81%,_#2876F1_53.21%,_#0057DF_82.62%)]
                ${className}
            `}
        >
            {children}
        </div>
    )
}

export default GradientCircle