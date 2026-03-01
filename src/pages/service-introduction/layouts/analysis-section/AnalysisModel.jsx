import SectionContent from "../../components/SectionContent"
import AxisInfoCard from "../../components/AxisInfoCard"
import graphImg from "../../../../assets/imgs/3DModelGraph.svg"

function AnalysisModel() {
    return (
        <SectionContent title="분석 모델" titleBottom={56} marginBottom={143}>
            <div className="flex gap-[62px] items-center ml-[37px]">
                <div className="w-[430px] h-[430px] rounded-full border border-[#2876F1] border-dashed flex items-center justify-center">
                    <img src={graphImg} alt="3D 모델 그래프" className="w-[326px] h-[298px]" />
                </div>
                <div className="flex flex-col gap-[15px]">
                    <AxisInfoCard axis="X" title="학습수준" desc="성장 마인드셋, 신기술 학습 속도, 학습 이력 등을 정량적으로 측정" concept={`예) AI, 빅데이터 등 최신 기술을 얼마나 빠르게 학습하고 적용하는지,\n실패 경험에서 얼마나 학습하는지`} />
                    <AxisInfoCard axis="Y" title="직무 적합성" desc="직무의 요구 역량과 개인의 역량 간 매칭도 측정" concept={`예) 데이터 사이언티스트로서 통계 역량, 프로그래밍 능력, 도메인 이해도,\n팀 협업 성향 등`} />
                    <AxisInfoCard axis="Z" title="수행 역량" desc="성과(KPI), 프로젝트 완성도, 문제 해결, 리더십 등을 측정" concept={`예) 프로젝트에서 어떤 성과를 냈는지,\n협업 환경에서 리더십과 팔로워십을 어떻게 발휘했는지`} />
                </div>
            </div>
            <div className="flex gap-[40px] mt-[124px]">
                <h4 className="text-[#717171] text-[14px] font-[500] leading-[160%]">배경이론</h4>
                <p className="text-[#717171] text-[14px] font-[400] leading-[160%]">
                    Kolb(1984): 경험학습 이론(Experiential Learning)을 통해 학습 경험과 반성적 사고가 개인의 역량 향상에 긴밀히 연결됨을 강조.<br />
                    Dweck(2006): “Growth Mindset” 이론을 통해 개인이 학습과 도전에 임하는 태도(학습 수준, 성장 가능성)가 중요한 성공 요소임을 시사.<br />
                    Holland, Boyatzis: 직무 적합성과 리더십, 성과 등 다양한 역량을 평가하는 여러 프레임워크를 제시.
                </p>
            </div>
        </SectionContent>
    )
}

export default AnalysisModel