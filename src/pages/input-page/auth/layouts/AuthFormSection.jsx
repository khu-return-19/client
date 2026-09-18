import { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import Agreement from "../components/Agreement";

function AuthFormSection() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [verificationResetKey, setVerificationResetKey] = useState(0);
  const [emailChangeKey, setEmailChangeKey] = useState(0);

  const handleEmailChanged = () => {
    setIsEmailSent(false);
    setIsCodeVerified(false);
    setVerifiedEmail("");
    setVerificationResetKey((key) => key + 1);
    setEmailChangeKey((key) => key + 1);
  };

  const handleProofExpired = () => {
    setIsEmailSent(false);
    setIsCodeVerified(false);
    setVerifiedEmail("");
    setVerificationResetKey((key) => key + 1);
  };

  const handleEmailSent = () => {
    setIsEmailSent(true);
    setIsCodeVerified(false);
    setVerifiedEmail("");
    setEmailChangeKey((key) => key + 1);
  };

  const handleCodeVerified = (email) => {
    setIsCodeVerified(true);
    setVerifiedEmail(email);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto mt-[80px] pb-[200px]">
      <EmailVerification
        resetKey={verificationResetKey}
        onEmailSent={handleEmailSent}
        onEmailChanged={handleEmailChanged}
        onVerificationExpired={handleProofExpired}
        onCodeVerified={handleCodeVerified}
      />
      <div className="mt-[100px]">
        <Agreement
          isEmailVerified={isEmailSent && isCodeVerified}
          email={verifiedEmail}
          emailChangeKey={emailChangeKey}
          onEmailInvalidated={handleProofExpired}
        />
      </div>
    </div>
  );
}

export default AuthFormSection;
