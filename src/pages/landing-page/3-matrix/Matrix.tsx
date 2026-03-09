// components
import ExplainSectionLayout from "../layouts/ExplainSectionLayout";
import SubTitle from "pages/landing-page/components/SubTitle";
import Arrow from "../../../assets/icons/Arrow.svg";

export default function Matrix() {
  return (
    <ExplainSectionLayout>
      <SubTitle 
      title="3D 역량평가 모델로 보는 세 가지 핵심 지표" 
      discription="학습 수준(X) · 직무적합 수준(Y) · 수행역량 수준(Z) 을 종합적으로 분석합니다." 
      />
      <div className="flex flex-row items-center justify-center pt-20">
        <div className="h-[416px] w-[416px]›">report</div>
        <img src={Arrow} alt="화살표" />
        <div className="border-1 border-[#C1D9FF] rounded-2xl shadow-[0_8px_24px_rgba(193,217,255,0.7)] gap-[73px]">
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
function LevelExplain({icon, title, description}: LevelExplainProps){
    return (
        <div className="flex items-center justify-center py-[37px] px-[40px]">
            <div className="text-[64px] px-8 text-[#2876F1]">{icon}</div>
            <div className="flex justify-between flex-col gap-1">
                <div className="text-[20px] font-semibold">{title}</div>
                <div className="font-[16px] text-[#717171]">{description}</div>
            </div>
        </div>
    )
}