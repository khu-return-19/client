import EmailVerification from "../components/EmailVerification";
import Agreement from "../components/Agreement";

function AuthFormSection() {
  return (
    <div className="w-[600px] mx-auto mt-[80px] pb-[200px]">
      <EmailVerification />
      <div className="mt-[100px]">
        <Agreement />
      </div>
    </div>
  );
}

export default AuthFormSection;
