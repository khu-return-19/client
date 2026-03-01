import SectionContent from "../../components/SectionContent";
import ServiceCaseCard from "../../components/ServiceCaseCard";
import case1 from "../../../../assets/imgs/사례1.svg";
import case2 from "../../../../assets/imgs/사례2.svg";
import case3 from "../../../../assets/imgs/사례3.svg";

function ServiceCases() {
    return (
        <SectionContent title="적용 사례" marginBottom={0}>
            <div className="ml-[171px] flex flex-col gap-[50px]">
                <ServiceCaseCard img={case1} title="기업 채용" desc={`수백~수천 명의 지원자를 AI로 빠르게 분석하여 상위 우수 인재를 선별하고,\n부족 역량을 파악해 보충 학습 기회를 제공`} />
                <ServiceCaseCard img={case2} title="취업 준비생 컨설팅" desc={`지원자가 자기소개서와 포트폴리오를 업로드하면,\nAI챗봇이 현재 역량(X, Y, Z)을 점수화하고 부족한 부분별 활동 계획을 안내해 합격률을 높임`} />
                <ServiceCaseCard img={case3} title="조직 내 역량 관리" desc={`재직자들의 역량 주기적으로 평가 · 분석하여, 인재 배치 최적화와 프로젝트 성과 향상을 유도`} />
            </div>
        </SectionContent>
    );
}

export default ServiceCases;