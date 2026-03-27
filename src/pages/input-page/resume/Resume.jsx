import InputPageLayout from "../layouts/InputPageLayout";
import ResumeSection from "./layouts/ResumeSection";
import RequiredGuide from "../components/RequiredGuide";

function Resume() {
  return (
    <InputPageLayout>
      <RequiredGuide />
      <ResumeSection />
    </InputPageLayout>
  );
}

export default Resume;
