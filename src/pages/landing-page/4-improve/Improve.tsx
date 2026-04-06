import ExplainSectionLayout from "../layouts/ExplainSectionLayout";
import SubTitle from "pages/landing-page/components/SubTitle";
import { useInView } from "react-intersection-observer";

// image
import ChartReport from "../../../assets/icons/ChartReport.svg";
import PropsCons from "../../../assets/icons/PropsCons.svg";
import Brain from "../../../assets/icons/ImproveHead.svg";
import EstimateReport from "../../../assets/icons/EstimateReport.svg";

export default function Improve() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const cardExplain = [
    {
      color: "#226DE2",
      title: "합격자 역량 벤치마킹",
      description1: "최근 합격자 3D역량평가 데이터 제공",
      description2: "점수를 0.1단위 격차로 시각화, \n목표GAP의 명확화",
      image: ChartReport,
      className: "mr-5"
    },

    {
      color: "#0C5AD4",
      title: "강약점 진단",
      description1: "3D역량평가 그래프로 최고 · 최저 구간 표시",
      description2: "학습깊이, 직무 FIT, KPI달성력의\n구체적 강점 및 보완점 서술",
      image: PropsCons,
      className: ""
    },
    {
      color: "#0445AA",
      title: "맞춤 개선 전략",
      description1: "단기 · 중장기 실행 과제 제안",
      description2: "예) SCI 논문 1편 투고, 직무 특허 출원, \nOKR기반 프로젝트 리딩",
      image: Brain,
      className: "mr-5"
    },
    {
      color: "#002E76",
      title: "종합 평가 & 합격 가능성 제공",
      description1: "3D역량평가 점수 통해 핵심전략 종합 제공",
      description2: "기업 인재상과 최신 트렌드(ESG · AI)를 \n반영한 합격 전략 제공",
      image: EstimateReport,
      className: "w-full"
    }
  ]
  
  return (
    <ExplainSectionLayout className="sm:!pr-0">
      <SubTitle title="개선방식 제안" discription="합격자를 비교분석하여 구직자의 장단점 및 개선 전략을 제공합니다." />
      <div
        ref={ref}
        className="max-w-screen lg:pr-[120px] min-h-fit lg:w-full flex gap-[7px] mt-[45px] overflow-x-scroll scrollbar-hide"
      >
        {
          cardExplain.map((i, index) =>
            <Card
              key={index}
              index={index}
              isVisible={inView}
              color={i.color} 
              title={i.title} 
              description1={i.description1} 
              description2={i.description2} 
              image={i.image}
              className={i.className}
            />
          )
        }
      </div>
    </ExplainSectionLayout>
  );
}

interface CardProps {
  index: number;
  isVisible: boolean;
  color: string;
  title: string;
  description1: string;
  description2: string;
  image: string;
  className: string;
}

function Card({
  index, isVisible, color, title, description1, description2, image, className
}: CardProps){
  return (
    <div
      className={`lg:flex-1 min-w-[246px] rounded-lg py-10 px-5 pb-[170px] lg:pb-[220px] relative h-auto min-h-[324px] lg:min-h-[431px] xl:min-h-[440px] transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ backgroundColor: color, transitionDelay: `${index * 150}ms` }}
    >
      <h3 className="text-white text-base lg:text-[19px] xl:text-[20px] font-bold mb-[32px]">{title}</h3>
      <p className="text-white text-[14px] lg:text-[13px] xl:text-[15px] font-medium mb-[7px]">{description1}</p>
      <p className="text-white text-[14px] lg:text-[13px] xl:text-[15px] font-medium whitespace-pre-line">{description2}</p>
      <img src={image} alt={title} className={`absolute right-0 bottom-5 h-[134px] lg:h-[198px] ${className}`} />
    </div>
  )
}