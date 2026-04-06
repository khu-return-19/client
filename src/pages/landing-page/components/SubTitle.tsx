import cn from "utils/cn";

interface SubTitleProps {
  title: string;
  discription: string;
}

function SubTitle({ title, discription }: SubTitleProps) {
  return (
    <div className="flex flex-col gap-[10px] lg:gap-0">
      <h2 className={cn("text-xl text-[#00010D] lg:text-[28px] font-semibold")}>
        {title}
      </h2>
      <p className="text-[14px] font-normal text-[#717171] lg:text-[20px]">
        {discription}
      </p>
    </div>
  );
}

export default SubTitle;
