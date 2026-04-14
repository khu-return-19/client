import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KHUxPertineo from "assets/icons/KHUxpertineo.svg";
import { SESSION_STORAGE_KEY } from "api/sessionApi";
import TextMotion from "./TextMotion";

function HeroContent() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    const isSessionActive = !!sessionStorage.getItem(SESSION_STORAGE_KEY);
    navigate(isSessionActive ? "/input-page/company" : "/input-page/auth");
  };

  return (
    <div className="flex flex-col items-center w-full px-[24px] md:px-0 md:w-[37.2vw] pt-[10vh] md:pt-[18.3vh] pb-[20.1vh]">
      {/* KHU × Pertineo */}
      <div className="flex items-center justify-center h-[36px] md:h-[calc(1.042vw+30px)]">
        <img
          src={KHUxPertineo}
          alt="KHU × Pertineo"
          className="h-full w-auto select-none"
          draggable="false"
        />
      </div>

      {/* 타이틀 */}
      <div className="mt-[5vh] md:mt-[6.4vh] h-[clamp(80px,calc(12.24vw+34px),100px)] md:h-[calc(2.92vw+108px)] flex items-center justify-center w-full md:w-[calc(12.917vw+576px)]">
        <TextMotion />
      </div>

      {/* 설명 텍스트 */}
      <div className="flex items-center justify-center w-full md:w-[37.2vw] mt-[6vh] md:mt-[6.4vh]">
        <span className="text-[16px] md:text-[1.67vw] font-[600] leading-[150%] text-white text-center">
          3D 역량 분석 보고서 제공
        </span>
      </div>

      <div className="flex items-center justify-center w-full md:w-[37.2vw] mt-[1.5vh]">
        <span className="text-[13px] md:text-[1.11vw] font-[300] leading-[150%] text-white text-center">
          <span className="md:hidden">
            합격자 데이터로 학습된 인공지능 pertineo를 통해
            <br />
            3차원 역량분석 결과를 확인하세요
            <br />
            경희대학교 웹메일로 보고서를 전송해요
          </span>
          <span className="hidden md:inline">
            합격자 데이터로 학습된 인공지능 pertineo를 통해 3차원 역량분석
            결과를 확인하세요
          </span>
        </span>
      </div>

      <div className="hidden md:flex items-center justify-center w-full md:w-[37.2vw] mt-[1.5vh]">
        <span className="text-[1.11vw] font-[300] leading-[150%] text-white text-center">
          경희대학교 웹메일로 보고서를 전송해요
        </span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center justify-center gap-[8px] md:gap-[1.11vw] h-[40px] md:h-[calc(2.5vw+16px)] mt-[11vh] md:mt-[5.4vh] w-full md:w-[26.1vw]">
        <button className="group w-[90px] md:w-[8.33vw] h-full rounded-[4px] border-2 border-white bg-[#ECF1F8]/30 hover:bg-[#ECF1F8]/60 flex items-center justify-center transition-colors">
          <span className="text-[12px] md:text-[1.11vw] font-[500] leading-[150%] text-[#ECF1F8] group-hover:text-white transition-colors">
            예시 리포트
          </span>
        </button>

        <button
          className="w-[160px] md:w-[16.67vw] h-full rounded-[4px] bg-white flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleStart}
        >
          <span
            className="text-[13px] md:text-[1.11vw] font-[500] leading-[150%]"
            style={
              hovered
                ? { color: "#2876F1" }
                : {
                    background: "linear-gradient(90deg, #002983, #2876F1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
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
