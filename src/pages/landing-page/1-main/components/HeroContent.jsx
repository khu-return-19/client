import { useState } from "react";
import KHU from "assets/icons/KHU.svg";
import TextMotion from "./TextMotion";

function HeroContent() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center w-[37.2vw] pt-[18.3vh] pb-[20.1vh]">
      <div className="flex items-center justify-center w-[clamp(160px,calc(4.167vw+120px),180px)] h-[clamp(40px,calc(1.042vw+30px),45px)]">
        <img src={KHU} alt="KHU" className="w-[clamp(52px,calc(1.667vw+36px),60px)] h-[clamp(30px,calc(1.042vw+20px),35px)]" />
        <span className="text-[30px] font-[200] leading-[150%] text-white">&nbsp;×&nbsp;</span>
        <span className="w-[clamp(80px,calc(1.875vw+62px),89px)] h-[clamp(32px,calc(0.833vw+24px),36px)] text-[24px] font-[300] leading-[150%] text-white">Pertineo</span>
      </div>
      <div className="h-[clamp(136px,calc(2.92vw+108px),150px)] mt-[6.4vh] flex items-center justify-center w-[clamp(700px,calc(12.917vw+576px),762px)]">
        <TextMotion />
      </div>

      <div className="flex items-center justify-center w-[536px] mt-[6.4vh]">
        <span className="text-[24px] font-[600] leading-[150%] text-white">3D 역량 분석 보고서 제공</span>
      </div>

      <div className="flex items-center justify-center w-[536px] mt-[0.5vh]">
        <span className="text-[16px] font-[600] leading-[150%] text-white">합격자 데이터로 학습된 인공지능 pertineo를 통해 3차원 역량분석 결과를 확인하세요</span>
      </div>

      <div className="flex items-center justify-center w-[536px] mt-[0.5vh]">
        <span className="text-[16px] font-[600] leading-[150%] text-white">경희대학교 웹메일로 보고서를 전송해요</span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center justify-center gap-[1.11vw] h-[clamp(40px,calc(2.5vw+16px),52px)] mt-[5.4vh] w-[clamp(280px,26.1vw,376px)]">
        <button className="group w-[8.33vw] h-full rounded-[4px] border-2 border-white bg-[#ECF1F8]/30 hover:bg-[#ECF1F8]/60 flex items-center justify-center transition-colors">
          <span className="text-[1.11vw] font-[500] leading-[150%] text-[#ECF1F8] group-hover:text-white transition-colors">예시 리포트</span>
        </button>

        <button
          className="w-[16.67vw] h-full rounded-[4px] bg-white flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            className="text-[1.11vw] font-[500] leading-[150%]"
            style={hovered
              ? { color: "#2876F1" }
              : { background: "linear-gradient(90deg, #002983, #2876F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
            }
          >
            자기소개서 입력하러 가기
          </span>
        </button>
      </div>
    </div>
  );
}

export default HeroContent;
