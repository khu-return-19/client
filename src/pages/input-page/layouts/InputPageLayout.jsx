import Header from "components/Header/Header";
import TitleSection from "../components/TitleSection";
import NavigationBar from "../components/NavigationBar";

function InputPageLayout({ children, showRequired = true }) {
  return (
    <div className="pt-[clamp(52px,calc(2.5vw+28px),64px)]">
      <Header />
      <div className="px-[20px] min-[894px]:px-[40px]">
        <TitleSection />
        <NavigationBar />
        {children}
      </div>
    </div>
  );
}

export default InputPageLayout;
