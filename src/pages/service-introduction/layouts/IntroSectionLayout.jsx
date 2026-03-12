import HeroSection from "../components/HeroSection"
import IntroSummary from "./intro-section/IntroSummary"
import FeatureList from "./intro-section/FeatureList"
import ServiceCases from "./intro-section/ServiceCases"

function IntroSectionLayout() {
    return (
        <HeroSection title="서비스 소개" titleStyle="min-[991px]:mb-[71px] min-[769px]:mb-[70px] max-[768px]:mb-[50px]">
            <IntroSummary />
            <FeatureList />
            <ServiceCases />
        </HeroSection>
    )
}

export default IntroSectionLayout