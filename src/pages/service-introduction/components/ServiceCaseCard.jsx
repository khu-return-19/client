function ServiceCaseCard({ img, title, desc }) {
    return (
        <div className="flex items-center gap-[65px]">
            <img src={img} alt={title} className="w-[103px] h-[103px]" />
            <div className="flex flex-col gap-[12px]">
                <h3 className="text-[20px] font-[500] leading-[120%]">{title}</h3>
                <p className="text-[16px] font-[400] leading-[150%] whitespace-pre-line">{desc}</p>
            </div>
        </div>
    );
}

export default ServiceCaseCard;