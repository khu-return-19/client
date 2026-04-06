import SectionContent from "../../components/SectionContent"

function IntroSummary() {
    return (
        <SectionContent title="Pertineo : 합격자 데이터 기반 자기소개서 분석 AI" marginBottom={120} titleStyle="max-[768px]:mb-[20px] max-[768px]:text-[16px]">
            <div className="w-full flex items-start">
                <div className="flex-shrink-0 w-[8px] self-stretch rounded-[20px_0_0_20px] bg-[linear-gradient(180deg,_#2876F1_53.62%,_#002983_100%)] mr-[12px]" />
                <div className="flex flex-col gap-[16px] max-[768px]:gap-[8px] py-[2px] box-border ">
                    <p className="text-[#000] text-[20px] max-[768px]:text-[14px] leading-[150%] font-[400] break-keep">
                        지원자가 제공한 정보(자기소개서, 전공, 학점 등), 합격자 데이터, 실시간 웹 서치 정보를 바탕으로<span className="hidden min-[1132px]:inline"><br /></span> 개인의 학습 능력(X축), 직무 적합성(Y축), 수행 역량(Z축)을 종합 평가해 주는 솔루션입니다.
                    </p>
                    <p className="text-[#000] text-[20px] max-[768px]:text-[14px] leading-[150%] font-[400] break-keep">
                        전통적인 2D 평가(지식 또는 기술 중심)에서 확장된 3D 평가 모델을 사용함으로써<span className="hidden min-[1132px]:inline"><br /></span> 마인드셋, 직무 요구 역량, 프로젝트 수행 능력 등을 파악할 수 있습니다.
                    </p>
                </div>
            </div>
        </SectionContent>
    )
}

export default IntroSummary