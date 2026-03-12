import SectionContent from "../../components/SectionContent"
import FeatureCard from "../../components/FeatureCard"

function FeatureList() {
    return (
        <SectionContent title="주요기능" marginBottom={150}>
            <div className="w-full flex min-[991px]:justify-end max-[990px]:flex-col items-start min-[991px]:gap-[15px] max-[990px]:gap-[20px] min-[991px]:mb-[15px] max-[990px]:mb-[20px] max-[768px]:mb-[12px] max-[768px]:gap-[12px]">
                <FeatureCard
                    index={1}
                    title="AI 기반 자동분석"
                    desc={`NLP, 딥러닝 등을 통해 자기소개서와 이력서를 정량화, 3D 그래프나 대시보드로 결과를 시각화함`}
                />
                <FeatureCard
                    index={2}
                    title="미래 직업 동향 반영"
                    desc={`WEF 보고서, LinkedIn 등에서 수집한 최신 채용 트렌드를 토대로 평가 기준 자동 업데이트`}
                />
            </div>
            <div className="w-full flex min-[991px]:justify-end max-[990px]:flex-col items-start min-[991px]:gap-[15px] max-[990px]:gap-[20px] max-[768px]:gap-[12px]">
                <FeatureCard
                    index={3}
                    title="맞춤형 피드백 및 실행 계획 제공"
                    desc={`X(학습 능력), Y(직무 적합성), Z축(수행 역량)의 평가 기준에 따라 지원자 준석 및 개선 방안 제공`}
                    concept={`X축(학습 능력): 추천 강의, 학습 플랫폼 안내(Coursera, edX 등)\nY축(직무 적합성): 직무 맞춤형 프로젝트나 멘토링 프로그램 연결\nZ축(수행 역량): Kaggle, 해커톤, 실무 프로젝트 참여 기회 제안`}
                />
                <FeatureCard
                    index={4}
                    title="재평가 루프"
                    desc={`3~6개월 간격으로 재평가를 실시해 역량 변화 추이를 파악, 목표치를 제시함으로써 지속 성장과 역량 고도화를 지원`}
                />
            </div>
        </SectionContent>
    )
}

export default FeatureList