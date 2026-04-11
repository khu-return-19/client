import { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import Agreement from "../components/Agreement";

function AuthFormSection() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const handleCodeVerified = (email) => {
    setIsCodeVerified(true);
    setVerifiedEmail(email);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto mt-[80px] pb-[200px]">
      <EmailVerification
        onEmailSent={() => setIsEmailSent(true)}
        onEmailChanged={() => setIsEmailSent(false)}
        onCodeVerified={handleCodeVerified}
      />
      <div className="mt-[100px]">
        <Agreement
          isEmailVerified={isEmailSent && isCodeVerified}
          email={verifiedEmail}
        />
      </div>
    </div>
  );
}

export default AuthFormSection;
