import InputPageLayout from "../layouts/InputPageLayout";
import GuideSection from "./layouts/GuideSection";
import AuthFormSection from "./layouts/AuthFormSection";

function Auth() {
  return (
    <InputPageLayout>
      <GuideSection />
      <AuthFormSection />
    </InputPageLayout>
  );
}

export default Auth;
