import KHU from "assets/icons/KHU.svg";

function HeroContent() {
  return (
    <div className="flex flex-col items-center w-[536px] pt-[135px] pb-[148px]">
      <div className="flex items-center justify-center w-[180px] h-[45px]">
        <img src={KHU} alt="KHU" className="w-[60px] h-[35px]" />
        <span className="text-[30px] font-[200] leading-[150%] text-white">&nbsp;×&nbsp;</span>
        <span className="text-[24px] font-[300] leading-[150%] text-white">Pertineo</span>
      </div>
    </div>
  );
}

export default HeroContent;
