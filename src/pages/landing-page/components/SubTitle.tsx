interface SubTitleProps {
    title: string;
    discription: string;
}

function SubTitle({ title, discription }: SubTitleProps) {
    return (
        <div className="flex flex-col gap-[15px]">
            <h2 className="text-[28px] font-semibold text-[#00010D]">{title}</h2>
            <p className="text-[20px] font-normal text-[#717171]">{discription}</p>
        </div>
    )
}

export default SubTitle;