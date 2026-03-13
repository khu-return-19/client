import Header from "components/Header/Header";
import TitleSection from "../components/TitleSection";
import NavigationBar from "../components/NavigationBar";

function InputPageLayout({ children }) {
  return (
    <div style={{ paddingTop: "var(--header-height)" }}>
      <Header />
      <TitleSection />
      <NavigationBar />
      {children}
    </div>
  );
}

export default InputPageLayout;
