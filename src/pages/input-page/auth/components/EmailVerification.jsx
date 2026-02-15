import { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import errorIcon from "assets/icons/Frame 283.png";
import successIcon from "assets/icons/Frame 286.png";

function EmailVerification({ onEmailSent, onEmailChanged, onCodeVerified }) {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [showCodeSection, setShowCodeSection] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [code, setCode] = useState("");
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const timerRef = useRef(null);

  const hasInput = email.trim().length > 0;
  const isValidEmail = email.endsWith("@khu.ac.kr") && email.split("@")[0].length > 0;

  const handleSend = () => {
    if (!hasInput) return;
    if (!isValidEmail) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setIsSent(true);
    setShowCodeSection(true);
    setTimeLeft(600);
    setCode("");
    setCodeError(false);
    onEmailSent?.();
  };

  useEffect(() => {
    if (isSent && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isSent, timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const getEmailButtonStatus = () => {
    if (isSent) return "completed";
    if (hasInput) return "default";
    return "disabled";
  };

  const getEmailBorderClass = () => {
    if (emailError) return "border-b border-[#B60000]";
    if (isSent) return "border-b border-[#717171]";
    if (isEmailFocused) return "border-b-2 border-[#09469F]";
    return "border-b border-[#858585]";
  };

  const hasCodeInput = code.trim().length > 0;

  const getCodeButtonStatus = () => {
    if (hasCodeInput) return "default";
    return "disabled";
  };

  const getCodeBorderClass = () => {
    if (codeError) return "border-b border-[#B60000]";
    if (isCodeFocused) return "border-b-2 border-[#09469F]";
    return "border-b border-[#858585]";
  };

  const getCodeBorderClassFinal = () => {
    if (isVerified) return "border-b border-[#717171]";
    return getCodeBorderClass();
  };

  const getCodeButtonStatusFinal = () => {
    if (isVerified) return "completed";
    return getCodeButtonStatus();
  };

  const handleVerify = () => {
    if (!hasCodeInput) return;
    // TODO: 인증번호 확인 API 구현 후 수정 예정
    // 성공 시:
    // setIsVerified(true);
    // setCodeError(false);
    // clearInterval(timerRef.current);
    // onCodeVerified?.();
    // 실패 시:
    // setCodeError(true);
  };

  return (
    <div className="w-[600px]">
      <h2 className="text-[24px] font-medium leading-[120%] text-black text-center">
        이메일 인증
      </h2>

      <div className="w-[600px] mt-[40px]">
        <div className="flex items-center gap-[4px]">
          <span className="text-[20px] font-medium leading-[150%] text-black">
            이메일
          </span>
          <span className="text-[20px] font-medium leading-[150%] text-[#2876F1]">
            *
          </span>
          <span className="text-[16px] font-normal leading-[150%] text-[#717171] ml-[5px]">
            경희대학교 메일만 가능합니다.
          </span>
        </div>

        <div className="flex items-center gap-[16px] mt-[12px]">
          <input
            type="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isSent) {
                setIsSent(false);
                onEmailChanged?.();
              }
              if (emailError) setEmailError(false);
            }}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            className={`w-[384px] h-[52px] px-[8px] ${getEmailBorderClass()} text-[16px] font-normal text-black placeholder-silver outline-none bg-transparent`}
          />
          <Button
            size="s2"
            status={getEmailButtonStatus()}
            onClick={handleSend}
          >
            인증번호 전송
          </Button>
        </div>

        {emailError && (
          <div className="flex items-center gap-[4px] mt-[4px]">
            <img src={errorIcon} alt="error" className="w-[24px] h-[24px]" />
            <span className="text-[16px] font-normal leading-[150%] text-[#A40F16]">
              이메일이 올바르지 않습니다.
            </span>
          </div>
        )}
      </div>

      {showCodeSection && (
        <div className="w-[600px] mt-[40px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[20px] font-medium leading-[150%] text-black">
              인증번호
            </span>
            <span className="text-[20px] font-medium leading-[150%] text-[#2876F1]">
              *
            </span>
          </div>

          <div className="flex items-center gap-[16px] mt-[12px]">
            <div className="relative w-[384px]">
              <input
                type="text"
                placeholder="인증번호입력"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (codeError) setCodeError(false);
                }}
                onFocus={() => setIsCodeFocused(true)}
                onBlur={() => setIsCodeFocused(false)}
                className={`w-full h-[52px] px-[8px] ${getCodeBorderClassFinal()} text-[16px] font-normal text-black placeholder-silver outline-none bg-transparent`}
              />
              <span className="absolute right-[8px] top-1/2 -translate-y-1/2 text-[16px] font-normal text-[#09469F]">
                {formatTime(timeLeft)}
              </span>
            </div>
            <Button
              size="s2"
              status={getCodeButtonStatusFinal()}
              onClick={handleVerify}
            >
              인증번호 확인
            </Button>
          </div>

          {codeError && (
            <div className="flex items-center gap-[4px] mt-[4px]">
              <img src={errorIcon} alt="error" className="w-[24px] h-[24px]" />
              <span className="text-[16px] font-normal leading-[150%] text-[#A40F16]">
                인증번호가 일치하지 않습니다.
              </span>
            </div>
          )}

          {isVerified && (
            <div className="flex items-center gap-[4px] mt-[4px]">
              <img src={successIcon} alt="success" className="w-[24px] h-[24px]" />
              <span className="text-[16px] font-normal leading-[150%] text-[#09469F]">
                인증되었습니다.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EmailVerification;
