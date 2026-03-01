import HeroSection from "../components/HeroSection"
import AnalysisModel from "./analysis-section/AnalysisModel"
import EvaluationMethod from "./analysis-section/EvaluationMethod"

function AnalysisSectionLayout() {
    return (
        <HeroSection title="3D 역량분석이란?">
            <AnalysisModel />
            <EvaluationMethod />
        </HeroSection>
    )
}

export default AnalysisSectionLayout;