import SectionContent from "../../components/SectionContent"
import EvaluationStep from "../../components/EvaluationStep"

function EvaluationMethod() {
    const evaluationData = [
        {
            step: "step 1",
            color: "#2876F1",
            title: "다중 모달 데이터 분석",
            desc: "자기소개서 텍스트, 포트폴리오(코드, 디자인 시안 등), 영상(발표·인터뷰 영상) 데이터를\nNLP, 텍스트 마이닝, 컴퓨터 비전 기술로 분석해 정량적 점수를 산출",
            marginBottom: "mb-[62px]"
        },
        {
            step: "step 2",
            color: "#024FCB",
            title: "데이터베이스 연동",
            desc: "기업 · 직무별로 필요한 역량 지표와 기존 합격자의 평균치를 참조해, 지원자의 (X, Y, Z) 점수를 상대 비교",
            marginBottom: "mb-[88px]"
        },
        {
            step: "step 3",
            color: "#002983",
            title: "시각화",
            desc: "3D 그래프, 대시보드 등을 통해 한눈에 강 · 약점을 파악할 수 있도록 제공",
            marginBottom: ""
        }
    ];

    return (
        <SectionContent title="평가 방식">
            <div className="relative" style={{ marginLeft: 'clamp(0px, calc(100vw - 1096px), 171px)' }}>
                <div className="flex flex-col">
                    <div className="relative">
                        <div
                            className="absolute left-[7px] top-[12px] h-full w-[2px] bg-[linear-gradient(180deg,_#2876F1_0%,_#024FCB_50%,_#002983_100%)]"
                        />
                        {evaluationData.slice(0, -1).map((item, index) => (
                            <EvaluationStep key={index} {...item} />
                        ))}
                    </div>
                    <EvaluationStep {...evaluationData[evaluationData.length - 1]} />
                </div>
            </div>
        </SectionContent>
    )
}

export default EvaluationMethod