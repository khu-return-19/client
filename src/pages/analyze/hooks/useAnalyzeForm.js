import { useState, useRef, useEffect } from "react";
import { useSendVerifyEmail, useVerifyEmailCode } from "api/emailApi";
import { toast } from "react-toastify";

export const useAnalyzeForm = (getValues, setCount) => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const timerRef = useRef(null);

  const { mutate: sendVerifyEmail, isPending: emailPending } = useSendVerifyEmail();
  const { mutate: verifyEmailCode, isPending: codePending } = useVerifyEmailCode();

  const handleSendCode = () => {
    const email = getValues("email");
    if (!email) return toast.info("이메일을 입력해주세요.");

    sendVerifyEmail(email, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("인증번호가 이메일로 전송되었습니다.");
          setIsCodeSent(true);
          setEmailSuccess(true);
          setRemainingTime(600);
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = setInterval(() => {
            setRemainingTime((prev) => {
              if (prev <= 1) {
                clearInterval(timerRef.current);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          toast.error("경희대학교 구성원이 아닙니다.");
        }
      },
      onError: () => toast.error("이메일 전송에 실패했습니다."),
    });
  };

  const handleVerifyCode = () => {
    const email = getValues("email");
    const accessCode = getValues("accessCode");
    if (!email || !accessCode) return toast.info("이메일과 인증번호를 모두 입력해주세요.");

    verifyEmailCode(
      { email, accessCode },
      {
        onSuccess: (data) => {
          console.log("Verification response:", data);
          if (data.valid) {
            toast.success("이메일 인증이 완료되었습니다.");
            setCount(data.count);
            setCodeSuccess(true);
          } else {
            toast.error("인증번호가 올바르지 않습니다.");
          }
        },
        onError: () => toast.error("인증에 실패했습니다."),
      }
    );
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return {
    isCodeSent,
    emailSuccess,
    codeSuccess,
    remainingTime,
    emailPending,
    codePending,
    handleSendCode,
    handleVerifyCode,
  };
};
