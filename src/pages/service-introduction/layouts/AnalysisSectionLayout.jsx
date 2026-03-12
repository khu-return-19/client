import HeroSection from "../components/HeroSection"
import AnalysisModel from "./analysis-section/AnalysisModel"
import EvaluationMethod from "./analysis-section/EvaluationMethod"
import ValueProposition from "./analysis-section/ValueProposition"

function AnalysisSectionLayout() {
    return (
        <HeroSection title="3D 역량분석이란?" titleStyle="max-[768px]:text-center min-[769px]:mb-[80px] max-[768px]:mb-[50px]">
            <AnalysisModel />
            <EvaluationMethod />
            <ValueProposition />
        </HeroSection>
    )
}

export default AnalysisSectionLayout;