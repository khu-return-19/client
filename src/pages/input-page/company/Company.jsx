import InputPageLayout from "../layouts/InputPageLayout";
import CompanySection from "./layouts/CompanySection";
import RequiredGuide from "../components/RequiredGuide";

function Company() {
  return (
    <InputPageLayout>
      <RequiredGuide />
      <CompanySection />
    </InputPageLayout>
  )
}

export default Company;
