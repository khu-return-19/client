import Header from "components/Header/Header";
import TitleSection from "../components/TitleSection";
import NavigationBar from "../components/NavigationBar";

function InputPageLayout({ children, showRequired = true }) {
  return (
    <div style={{ paddingTop: "var(--header-height)" }}>
      <Header />
      <div className="min-[894px]:px-[40px] max-[893px]:px-[20px]">
        <TitleSection />
        <NavigationBar />
        {children}
      </div>
    </div>
  );
}

export default InputPageLayout;
