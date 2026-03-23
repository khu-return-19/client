import { useState } from "react";
import Button from "./Button";
import SessionIcon from "../../../assets/icons/세션.svg";
import AngleDownIcon from "../../../assets/icons/확장.svg";

const GUIDE_CONTENT = [
  {
    title: "이용 방법 안내",
    body: "지원하고자 하는 기업과 직무를 입력하고, 자기소개서와 이력서를 입력합니다.\nPertineo가 기존 합격자 데이터, Web Search, 3차원(3D) 척도를 기반으로 분석하여 보고서를 생성합니다.\n생성된 보고서는 경희대학교 웹메일로 전송됩니다."
  },
  {
    title: "이용시 주의 사항",
    body: "1. 경희대학교 웹 메일 당 3회의 분석이 가능합니다. 매일 자정 이용 가능 횟수가 초기화됩니다.\n2. 정상적이지 않은 입력(빈 입력, 부족한 분량의 자기소개서)을 자동으로 반려하며, 반복적인 반려시 분석 이용 횟수가 차감될 수 있으니 유의하시길 바랍니다.\n3. 보고서의 정량적 수치는 합격자, 실시간 웹 서치 결과 등을 고려한 수치로 시간에 따라 변동될 수 있습니다.\n4. 인공지능은 실수 할 수 있습니다. 중요한 정보는 재차 확인하시길 바랍니다."
  }
];

function TitleSection() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-[80px]">
      <h1 className="text-[24px] font-medium leading-[120%] text-black font-['Pretendard']">
        Pertineo 3D 역량 분석
      </h1>
      <div className="flex items-center justify-between gap-[20px] mt-[10px]">
        <p className="max-[893px]:hidden text-[16px] font-normal leading-[150%] text-black font-['Pretendard']">
          Pertineo에게 희망 기업과 직무 그리고 본인의 역량을 나타낼 수 있는 정보를 제공하여, 커리어 컨설팅 보고서를 생성할 수 있습니다.
        </p>

        <div className="min-[894px]:hidden flex-1 min-w-0 relative">
         
          <button
            className="flex items-center gap-[8px]"
            onClick={() => setIsOverlayOpen(prev => !prev)}
          >
            <span className="text-[#717171] font-['Pretendard'] text-[14px] leading-[160%]">이용 방법 및 주의 사항</span>
            <img
              src={AngleDownIcon}
              alt="화살표"
              className={`w-[16px] h-[16px] transition-transform duration-200 ${isOverlayOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOverlayOpen && (
            <div className="absolute top-0 left-0 w-full bg-[#F4F6F8] rounded-[10px] z-50 flex flex-col p-[24px_16px] gap-[20px]">
              
              <button
                className="flex items-center gap-[8px] self-start"
                onClick={() => setIsOverlayOpen(false)}
              >
                <span className="text-[#717171] font-['Pretendard'] text-[14px] leading-[160%]">이용 방법 및 주의 사항</span>
                <img src={AngleDownIcon} alt="화살표" className="w-[16px] h-[16px] rotate-180" />
              </button>

            
              {GUIDE_CONTENT.map((section) => (
                <div key={section.title}>
                  <p className="text-[#000] font-['Pretendard'] text-[16px] font-[500] leading-[150%] mb-[4px]">
                    {section.title}
                  </p>
                  <p className="text-[#717171] font-['Pretendard'] text-[15px] font-[400] leading-[160%] whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-[8px] max-[893px]:gap-[6px] shrink-0">
          <Button size="s1">세션 연장</Button>
          <div className="flex items-center gap-[2px]">
            <img src={SessionIcon} alt="세션" className="w-[24px] h-[24px]" />
            <span className="text-[20px] font-[300] leading-[120%] text-[#09469F] font-['Pretendard']">00:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleSection;
