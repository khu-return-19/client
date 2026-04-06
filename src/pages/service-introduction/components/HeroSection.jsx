function HeroSection({ title, children, titleStyle = "" }) {
    return (
        <div className="w-full flex flex-col min-[769px]:pt-[80px] min-[595px]:pt-[60px] max-[594px]:pt-[40px] min-[769px]:pb-[120px] min-[595px]:pb-[40px] max-[594px]:pb-[60px] items-center">
            <h1 className={`w-full min-[769px]:text-[24px] max-[768px]:text-[20px] font-[500] ${titleStyle}`}>{title}</h1>
            <div className="w-full flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default HeroSection