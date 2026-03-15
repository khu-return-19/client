import SectionContent from "pages/service-introduction/components/SectionContent";

const valuePropositionData = [
    {
        title: "입체적 역량 파악",
        desc: "기존의 단순 필기·면접 평가가 아닌, 학습 태도·직무 핏·성과 역량 등을 복합적으로 측정하여 높은 신뢰도 확보",
    },
    {
        title: "학습동기 부여와 리스트 최소화",
        desc: "지원자 · 재직자 모두 현재 수준과 잠재력을 정확히 파악해 맞춤형 보완 학습을 진행할 수 있음",
    },
    {
        title: "DX 시대 최적화",
        desc: "WEF(세계경제포럼) 보고서에서 언급된 바와 같이, 새 기술 및 능력을 지속적으로 학습해야 하는 미래 업무 환경에 대비 가능",
    },
]

function ValueProposition() {
    return (
        <SectionContent title="활용 가치">
            <div className="w-full flex flex-col gap-[10px] items-end">
                {valuePropositionData.map((item, index) => (
                    <div
                        key={index}
                        className="w-full max-w-[909px] 
                            py-[24px]
                            min-[769px]:px-[24px]
                            max-[768px]:px-[16px]
                            rounded-[12px] 
                            border border-[#C1D9FF] 
                            bg-white/60 
                            shadow-[0_0_12px_0_rgba(193,217,255,0.70)]
                            backdrop-blur-sm
                            flex flex-col gap-[16px]
                        "
                        style={{ marginLeft: 'clamp(0px, calc(100vw - 1149px), 118px)' }}
                    >
                        <h3 className="text-[#000] font-[500] min-[769px]:text-[20px] max-[768px]:text-[16px] max-[768px]:text-center">{item.title}</h3>
                        <p className="text-[#000] font-[400] min-[769px]:text-[16px] max-[768px]:text-[15px] max-[768px]:text-center leading-[150%]">{item.desc}</p>
                    </div>
                ))}
            </div>
        </SectionContent>
    );
}
 
export default ValueProposition;