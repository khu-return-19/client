import KHU from "assets/icons/KHU.svg";
import TextMotion from "./TextMotion";

function HeroContent() {
  return (
    <div className="flex flex-col items-center w-[536px] pt-[135px] pb-[148px]">
      <div className="flex items-center justify-center w-[180px] h-[45px]">
        <img src={KHU} alt="KHU" className="w-[60px] h-[35px]" />
        <span className="text-[30px] font-[200] leading-[150%] text-white">&nbsp;×&nbsp;</span>
        <span className="text-[24px] font-[300] leading-[150%] text-white">Pertineo</span>
      </div>
      <div className="w-[762px] h-[150px] mt-[47px] flex items-center justify-center">
        <TextMotion />
      </div>

      <div className="flex items-center justify-center w-[242px] h-[36px] mt-[47px]">
        <span className="text-[24px] font-[600] leading-[150%] text-white">3D 역량 분석 보고서 제공</span>
      </div>

 
      <div className="flex items-center justify-center w-[536px] h-[24px] mt-[4px]">
        <span className="text-[16px] font-[600] leading-[150%] text-white">합격자 데이터로 학습된 인공지능 pertineo를 통해 3차원 역량분석 결과를 확인하세요</span>
      </div>

      
      <div className="flex items-center justify-center w-[536px] h-[24px] mt-[4px]">
        <span className="text-[16px] font-[600] leading-[150%] text-white">경희대학교 웹메일로 보고서를 전송해요</span>
      </div>
    </div>
  );
}

export default HeroContent;
