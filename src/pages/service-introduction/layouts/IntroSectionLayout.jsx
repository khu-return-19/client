import HeroSection from "../components/HeroSection"
import IntroSummary from "./intro-section/IntroSummary"
import FeatureList from "./intro-section/FeatureList"
import ServiceCases from "./intro-section/ServiceCases"

function IntroSectionLayout() {
    return (
        <HeroSection title="서비스 소개" titleBottom={71}>
            <IntroSummary />
            <FeatureList />
            <ServiceCases />
        </HeroSection>
    )
}

export default IntroSectionLayout