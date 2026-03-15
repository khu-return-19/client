import PageLayout from "./layouts/PageLayout"
import IntroSectionLayout from "./layouts/IntroSectionLayout"
import AnalysisSectionLayout from "./layouts/AnalysisSectionLayout"

function ServiceIntroduction() {
    return (
        <PageLayout>
            <IntroSectionLayout />
            <AnalysisSectionLayout />
        </PageLayout>
    )
}

export default ServiceIntroduction