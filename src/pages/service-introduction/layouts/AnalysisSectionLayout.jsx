import HeroSection from "../components/HeroSection"
import AnalysisModel from "./analysis-section/AnalysisModel"
import EvaluationMethod from "./analysis-section/EvaluationMethod"
import ValueProposition from "./analysis-section/ValueProposition"

function AnalysisSectionLayout() {
    return (
        <HeroSection title="3D 역량분석이란?">
            <AnalysisModel />
            <EvaluationMethod />
            <ValueProposition />
        </HeroSection>
    )
}

export default AnalysisSectionLayout;