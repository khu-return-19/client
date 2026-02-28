function HeroSection({ title, children, titleBottom = 80 }) {
    return (
        <div className="w-full flex flex-col pt-[80px] pb-[100px] items-center">
            <div className="w-[1200px] flex flex-col items-center">
                <h1 className="w-full text-[24px] font-[500] " style={{ marginBottom: `${titleBottom}px` }}>{title}</h1>
                <div className="w-full pl-[60px] pr-[60px] flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default HeroSection