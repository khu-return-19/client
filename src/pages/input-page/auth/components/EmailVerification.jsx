import { useState, useEffect, useRef } from "react";
import Button from "../../components/Button";
import errorIcon from "assets/icons/인증_실패.svg";
import successIcon from "assets/icons/인증_성공.svg";
import {
  getResponseStatus,
  getRetryAfterSeconds,
  useSendVerifyEmail,
  useVerifyEmailCode,
} from "api/emailApi";
import EmailSentModal from "./EmailSentModal";
import { clearClientAuthState } from "api/authRecovery";
import {
  EMAIL_CHALLENGE_DURATION_SECONDS,
  resetVerificationState,
} from "./verificationState";

const VERIFIED_EMAIL_KEY = "verifiedEmail";

function EmailVerification({
  resetKey = 0,
  onEmailSent,
  onEmailChanged,
  onVerificationExpired,
  onCodeVerified,
}) {
  const { mutate: sendVerifyEmail, isPending: isSending } =
    useSendVerifyEmail();
  const { mutate: verifyEmailCode, isPending: isVerifying } =
    useVerifyEmailCode();

  const savedEmail = sessionStorage.getItem(VERIFIED_EMAIL_KEY) || "";

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(savedEmail);
  const [isSent, setIsSent] = useState(false);
  const [showCodeSection, setShowCodeSection] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    "이메일이 올바르지 않습니다.",
  );
  const [emailRetryAfter, setEmailRetryAfter] = useState(0);

  const [code, setCode] = useState("");
  const [isCodeFocused, setIsCodeFocused] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = useState(
    "인증번호가 일치하지 않습니다.",
  );
  const [codeRetryAfter, setCodeRetryAfter] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EMAIL_CHALLENGE_DURATION_SECONDS);
  const timerRef = useRef(null);

  useEffect(() => {
    if (emailRetryAfter > 0) {
      const timer = setTimeout(
        () => setEmailRetryAfter((previous) => Math.max(0, previous - 1)),
        1000,
      );
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [emailRetryAfter]);

  useEffect(() => {
    if (codeRetryAfter > 0) {
      const timer = setTimeout(
        () => setCodeRetryAfter((previous) => Math.max(0, previous - 1)),
        1000,
      );
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [codeRetryAfter]);

  useEffect(() => {
    if (resetKey === 0) return;

    const reset = resetVerificationState();
    setShowModal(false);
    setIsSent(reset.isSent);
    setShowCodeSection(reset.showCodeSection);
    setIsVerified(reset.isVerified);
    setCode(reset.code);
    setCodeError(reset.codeError);
    setCodeErrorMessage("인증번호가 일치하지 않습니다.");
    setEmailError(false);
    setEmailErrorMessage("이메일이 올바르지 않습니다.");
    setEmailRetryAfter(0);
    setCodeRetryAfter(reset.codeRetryAfter);
    setTimeLeft(reset.timeLeft);
  }, [resetKey]);

  const hasInput = email.trim().length > 0;
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const handleSend = () => {
    if (
      isSending ||
      isVerifying ||
      isSent ||
      isVerified ||
      !hasInput ||
      emailRetryAfter > 0
    ) {
      return;
    }
    if (!isValidEmail) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    sendVerifyEmail(email, {
      onSuccess: () => {
        setIsSent(true);
        setShowCodeSection(true);
        setTimeLeft(EMAIL_CHALLENGE_DURATION_SECONDS);
        setCode("");
        setCodeError(false);
        setCodeErrorMessage("인증번호가 일치하지 않습니다.");
        setIsVerified(false);
        setEmailRetryAfter(0);
        setCodeRetryAfter(0);
        setShowModal(true);
        onEmailSent?.();
      },
      onError: (error) => {
        const status = getResponseStatus(error);
        const retryAfter = getRetryAfterSeconds(error);
        setEmailError(true);
        if (status === 429) {
          const seconds = retryAfter || 60;
          setEmailRetryAfter(seconds);
          setEmailErrorMessage(
            `인증번호 요청이 너무 많습니다. ${seconds}초 후 다시 시도해주세요.`,
          );
        } else {
          setEmailErrorMessage(error.message);
        }
      },
    });
  };

  useEffect(() => {
    if (isSent && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isSent, timeLeft]);

  useEffect(() => {
    if (!isSent || isVerified || timeLeft > 0) return;

    clearClientAuthState();
    const reset = resetVerificationState();
    setIsSent(reset.isSent);
    setShowCodeSection(reset.showCodeSection);
    setIsVerified(reset.isVerified);
    setCode(reset.code);
    setCodeError(reset.codeError);
    setCodeErrorMessage("인증번호가 일치하지 않습니다.");
    setCodeRetryAfter(reset.codeRetryAfter);
    setTimeLeft(reset.timeLeft);
    onVerificationExpired?.();
  }, [isSent, isVerified, timeLeft, onVerificationExpired]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const getEmailButtonStatus = () => {
    if (isSent) return "completed";
    if (isSending || emailRetryAfter > 0) return "disabled";
    if (hasInput) return "default";
    return "disabled";
  };

  const getEmailBorderClass = () => {
    if (emailError) return "border-b border-[#B60000]";
    if (isSent || isVerified) return "border-b border-[#717171]";
    if (isEmailFocused) return "border-b-2 border-[#09469F]";
    return "border-b border-[#858585]";
  };

  const hasCodeInput = code.trim().length > 0;

  const getCodeButtonStatus = () => {
    if (isVerifying || codeRetryAfter > 0) return "disabled";
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
    if (
      isSending ||
      isVerifying ||
      !isSent ||
      isVerified ||
      !showCodeSection ||
      !hasCodeInput ||
      codeRetryAfter > 0
    ) {
      return;
    }
    verifyEmailCode(
      { email, code },
      {
        onSuccess: () => {
          setIsVerified(true);
          // The five-minute proof cookie starts at verification time. The
          // challenge countdown no longer represents a deadline after this.
          setTimeLeft(0);
          setCodeError(false);
          setCodeErrorMessage("인증번호가 일치하지 않습니다.");
          setCodeRetryAfter(0);
          sessionStorage.setItem(VERIFIED_EMAIL_KEY, email);
          onCodeVerified?.(email);
        },
        onError: (error) => {
          const status = getResponseStatus(error);
          const retryAfter = getRetryAfterSeconds(error);
          setCodeError(true);
          if (status === 429) {
            const seconds = retryAfter || 60;
            setCodeRetryAfter(seconds);
            setCodeErrorMessage(
              `인증번호 확인 요청이 너무 많습니다. ${seconds}초 후 다시 시도해주세요.`,
            );
          } else {
            setCodeErrorMessage("인증번호가 일치하지 않습니다.");
          }
        },
      },
    );
  };

  return (
    <>
      {showModal && <EmailSentModal onClose={() => setShowModal(false)} />}
      <div className="w-full max-w-[600px]">
        <h2 className="text-[24px] font-medium leading-[120%] text-black text-center">
          이메일 인증
        </h2>

        <div className="w-full mt-[40px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[20px] font-medium leading-[150%] text-black">
              이메일
            </span>
            <span className="text-[20px] font-medium leading-[150%] text-[#2876F1]">
              *
            </span>
            {/* <span className="text-[16px] font-normal leading-[150%] text-[#717171] ml-[5px]">
              경희대학교 메일만 가능합니다.
            </span>  */}
          </div>

          <div className="flex items-center gap-[16px] mt-[12px] ">
            <div className="relative flex-1 ">
              <input
                type="email"
                placeholder="이메일 입력"
                value={email}
                disabled={isSending || isVerifying}
                onChange={(e) => {
                  const nextEmail = e.target.value;
                  setEmail(nextEmail);
                  if (nextEmail !== email) {
                    clearClientAuthState();
                    const reset = resetVerificationState();
                    setIsSent(reset.isSent);
                    setShowCodeSection(reset.showCodeSection);
                    setIsVerified(reset.isVerified);
                    setCode(reset.code);
                    setCodeError(reset.codeError);
                    setEmailRetryAfter(0);
                    setCodeRetryAfter(reset.codeRetryAfter);
                    setTimeLeft(reset.timeLeft);
                    onEmailChanged?.();
                  }
                  if (emailError) {
                    setEmailError(false);
                    setEmailErrorMessage("이메일이 올바르지 않습니다.");
                  }
                }}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className={`w-full h-[52px] max-[767px]:h-[40px] px-[8px] ${getEmailBorderClass()} text-[16px] font-normal text-black placeholder-silver outline-none bg-transparent disabled:text-[#717171]`}
              />
            </div>
            <Button
              size="s2"
              status={getEmailButtonStatus()}
              onClick={handleSend}
              className="max-[767px]:!w-[120px] max-[767px]:!h-[40px] max-[767px]:!text-[13px]"
            >
              인증번호 전송
            </Button>
          </div>

          {emailError && (
            <div className="flex items-center gap-[4px] mt-[4px]">
              <img src={errorIcon} alt="error" className="w-[24px] h-[24px]" />
              <span className="text-[16px] font-normal leading-[150%] text-[#A40F16]">
                  {emailErrorMessage}
              </span>
            </div>
          )}

          {isVerified && (
            <div className="flex items-center gap-[4px] mt-[12px]">
              <img
                src={successIcon}
                alt="success"
                className="w-[24px] h-[24px]"
              />
              <span className="text-[16px] font-normal leading-[150%] text-[#09469F]">
                인증되었습니다.
              </span>
            </div>
          )}
        </div>

        {showCodeSection && (
          <div className="w-full mt-[40px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[20px] font-medium leading-[150%] text-black">
                인증번호
              </span>
              <span className="text-[20px] font-medium leading-[150%] text-[#2876F1]">
                *
              </span>
            </div>

            <div className="flex items-center gap-[16px] mt-[12px]">
              <div className="relative flex-1">
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
                  className={`w-full h-[52px] max-[767px]:h-[40px] px-[8px] ${getCodeBorderClassFinal()} text-[16px] font-normal text-black placeholder-silver outline-none bg-transparent`}
                />
                {!isVerified && (
                  <span className="absolute right-[8px] top-1/2 -translate-y-1/2 text-[16px] max-[767px]:text-[13px] font-normal text-[#09469F]">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
              <Button
                size="s2"
                status={getCodeButtonStatusFinal()}
                onClick={handleVerify}
                className="max-[767px]:!w-[120px] max-[767px]:!h-[40px] max-[767px]:!text-[13px]"
              >
                인증번호 확인
              </Button>
            </div>

            {codeError && (
              <div className="flex items-center gap-[4px] mt-[4px]">
                <img
                  src={errorIcon}
                  alt="error"
                  className="w-[24px] h-[24px]"
                />
                <span className="text-[16px] font-normal leading-[150%] text-[#A40F16]">
                  {codeErrorMessage}
                </span>
              </div>
            )}

            {isVerified && (
              <div className="flex items-center gap-[4px] mt-[4px]">
                <img
                  src={successIcon}
                  alt="success"
                  className="w-[24px] h-[24px]"
                />
                <span className="text-[16px] font-normal leading-[150%] text-[#09469F]">
                  인증되었습니다.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default EmailVerification;
