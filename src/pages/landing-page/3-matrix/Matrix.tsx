// components
import ExplainSectionLayout from "../layouts/ExplainSectionLayout";
import SubTitle from "pages/landing-page/components/SubTitle";
import Arrow from "../../../assets/icons/Arrow.svg";
import cn from "utils/cn";

export default function Matrix() {
  return (
    <ExplainSectionLayout>
      <SubTitle
        title="3D 역량평가 모델로 보는 세 가지 핵심 지표"
        discription="학습 수준(X) · 직무적합 수준(Y) · 수행역량 수준(Z) 을 종합적으로 분석합니다."
      />
      <div className="flex flex-col h-full lg:flex-row items-center justify-center pt-[65px]">
        <div className="h-[416px] w-[416px]">report</div>
        <img className="opacity-0 lg:opacity-100" src={Arrow} alt="화살표" />
        <div
          className={cn(
            "flex items-start flex-col justify-around w-full min-h-[376px] border-[1px] border-[#C1D9FF] rounded-2xl shadow-[0_8px_24px_rgba(193,217,255,0.7)]",
            "lg:items-center lg:max-w-[496px] lg:max-h-[456px]",
          )}
        >
          <LevelExplain
            icon="X"
            title="학습 수준 Learning Level"
            description="지식 · 연구 · 실무 학습의 깊이 · 난이도 · 신규성 평가"
          />
          <LevelExplain
            icon="Y"
            title="직무적합 수준 Job Suitability Level"
            description="경험에 대한 직무핵심기술 · 조직문화의 일치도 평가"
          />
          <LevelExplain
            icon="Z"
            title="수행역량 수준 Performance Level"
            description="KPI · OKR 달성능력의 문제해결력 · 실행력 평가"
          />
        </div>
      </div>
    </ExplainSectionLayout>
  );
}

interface LevelExplainProps {
  icon: string;
  title: string;
  description: string;
}
function LevelExplain({ icon, title, description }: LevelExplainProps) {
  return (
    <div className="flex items-center justify-center px-[12px] lg:px-[40px]">
      <div className="text-[64px] px-8 text-[#2876F1]">{icon}</div>
      <div className="flex justify-between flex-col gap-1">
        <div className="text-base lg:text-[20px] font-semibold">{title}</div>
        <div className="text-[15px] lg:font-base text-[#717171]">
          {description}
        </div>
      </div>
    </div>
  );
}
