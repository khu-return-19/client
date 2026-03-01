import HeroSection from "../components/HeroSection"
import IntroSummary from "./intro-section/IntroSummary"
import FeatureList from "../components/FeatureList"
import ServiceCases from "../components/ServiceCases"

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