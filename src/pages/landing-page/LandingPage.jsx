import Header from "components/Header/Header";
import MainSectionLayout from "./main/layouts/MainSectionLayout";

function LandingPage() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <MainSectionLayout />
    </div>
  );
}

export default LandingPage;
