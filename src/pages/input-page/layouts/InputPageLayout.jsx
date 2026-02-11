import Header from "components/Header/Header";
import TitleSection from "../components/TitleSection";
import NavigationBar from "../components/NavigationBar";

function InputPageLayout({ children }) {
  return (
    <div>
      <Header />
      <TitleSection />
      <NavigationBar />
      {children}
    </div>
  );
}

export default InputPageLayout;
