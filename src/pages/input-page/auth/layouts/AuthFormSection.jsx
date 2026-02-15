import { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import Agreement from "../components/Agreement";

function AuthFormSection() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  return (
    <div className="w-[600px] mx-auto mt-[80px] pb-[200px]">
      <EmailVerification
        onEmailSent={() => setIsEmailSent(true)}
        onEmailChanged={() => setIsEmailSent(false)}
        onCodeVerified={() => setIsCodeVerified(true)}
      />
      <div className="mt-[100px]">
        <Agreement isEmailVerified={isEmailSent && isCodeVerified} />
      </div>
    </div>
  );
}

export default AuthFormSection;
