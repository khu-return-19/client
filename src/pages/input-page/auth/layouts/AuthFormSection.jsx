import { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import Agreement from "../components/Agreement";

function AuthFormSection() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  return (
    <div className="w-full max-w-[600px] mx-auto mt-[clamp(50px,5.56vw,80px)] pb-[clamp(124px,13.89vw,200px)]">
      <EmailVerification
        onEmailSent={() => setIsEmailSent(true)}
        onEmailChanged={() => setIsEmailSent(false)}
        onCodeVerified={() => setIsCodeVerified(true)}
      />
      <div className="mt-[clamp(62px,6.94vw,100px)]">
        <Agreement isEmailVerified={isEmailSent && isCodeVerified} />
      </div>
    </div>
  );
}

export default AuthFormSection;
