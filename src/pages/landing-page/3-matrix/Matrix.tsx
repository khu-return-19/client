import ExplainSectionLayout from "../layouts/ExplainSectionLayout";
import SubTitle from "pages/landing-page/components/SubTitle";

export default function Matrix() {
  return (
    <ExplainSectionLayout>
      <SubTitle 
      title="3D 역량평가 모델로 보는 세 가지 핵심 지표" 
      discription="학습 수준(X) · 직무적합 수준(Y) · 수행역량 수준(Z) 을 종합적으로 분석합니다." 
      />
      <div>
        <h1>Matrix</h1>
      </div>
    </ExplainSectionLayout>
  );
}