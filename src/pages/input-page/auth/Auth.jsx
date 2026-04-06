import { useState } from "react";
import InputPageLayout from "../layouts/InputPageLayout";
import GuideSection from "./layouts/GuideSection";
import AuthFormSection from "./layouts/AuthFormSection";
import GuideBox from "./components/GuideBox";
import Button from "../components/Button";
import Header from "components/Header/Header";

const isMobile = () => window.innerWidth <= 767;

function Auth() {
  const [guideConfirmed, setGuideConfirmed] = useState(!isMobile());

  if (!guideConfirmed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
          <div className="flex-1 flex flex-col px-[20px] pt-[calc(clamp(52px,calc(2.5vw+28px),64px)+24px)] pb-[40px]">
          <h1 className="text-[20px] font-semibold leading-[120%] text-black font-['Pretendard']">
            Pertineo 3D 역량 분석
          </h1>
          <p className="mt-[8px] text-[14px] font-normal leading-[150%] text-black font-['Pretendard']">
            Pertineo에게 희망 기업과 직무 그리고 본인의 역량을 나타낼 수 있는 정보를 제공하여, 커리어 컨설팅 보고서를 생성할 수 있습니다.
          </p>
          <div className="flex-1 mt-[24px]">
            <GuideBox />
          </div>
          <div className="mt-[32px] flex justify-center">
            <Button size="M" onClick={() => setGuideConfirmed(true)}>확인</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <InputPageLayout>
      <GuideSection />
      <AuthFormSection />
    </InputPageLayout>
  );
}

export default Auth;
