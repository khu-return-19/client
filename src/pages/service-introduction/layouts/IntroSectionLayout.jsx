import HeroSection from "../components/HeroSection"
import IntroSummary from "../components/IntroSummary"
import FeatureList from "../components/FeatureList"

function IntroSectionLayout() {
    return (
        <HeroSection title="서비스 소개" titleBottom={71}>
            <IntroSummary />
            <FeatureList />
        </HeroSection>
    )
}

export default IntroSectionLayout