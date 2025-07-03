import React, { useState, useRef, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AnalysisConfirmModal, EmailSendModal, VerifyCodeModal, Info } from "layouts/analyze";
import { toast } from "react-toastify";
import { useSendVerifyEmail, useVerifyEmailCode } from "api/emailApi";
import { TermsModal, PrivacyModal } from "components/analyze";

function Analyze() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const [universityNameLength, setUniversityNameLength] = useState(0);
  const [majorLength, setMajorLength] = useState(0);
  const [gpaLength, setGpaLength] = useState(0);
  const [careerLength, setCareerLength] = useState(0);
  const [languageScoreLength, setLanguageScoreLength] = useState(0);
  const [certificateLength, setCertificateLength] = useState(0);
  const [companyLength, setCompanyLength] = useState(0);
  const [positionLength, setPositionLength] = useState(0);
  const [urlLength, setUrlLength] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [count, setCount] = useState(0);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const timerRef = useRef(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const { mutate: sendVerifyEmail, isPending: emailPending } = useSendVerifyEmail();

  const { mutate: verifyEmailCode, isPending: codePending } = useVerifyEmailCode();

  const isDisabledEmail = emailPending || emailSuccess;
  const isDisabledCode = codePending || codeSuccess;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSendCode = () => {
    const email = getValues("email");

    if (!email) {
      toast.info("이메일을 입력해주세요.");
      return;
    }

    sendVerifyEmail(email, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("인증번호가 이메일로 전송되었습니다.");
          setIsCodeSent(true);
          setEmailSuccess(true);

          // 10분 타이머 시작
          setRemainingTime(600);
          if (timerRef.current) clearInterval(timerRef.current);

          timerRef.current = setInterval(() => {
            setRemainingTime((prev) => {
              if (!prev || prev <= 1) {
                clearInterval(timerRef.current);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          toast.error("이메일 전송에 실패했습니다. 경희대학교 구성원이 아닙니다.");
        }
      },
      onError: () => {
        toast.error("이메일 전송에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  const handleVerifyCode = () => {
    const email = getValues("email");
    const accessCode = getValues("accessCode");

    if (!email || !accessCode) {
      toast.info("이메일과 인증번호를 모두 입력해주세요.");
      return;
    }

    verifyEmailCode(
      { email, accessCode },
      {
        onSuccess: (data) => {
          if (data.valid) {
            toast.success("이메일 인증이 완료되었습니다.");
            setCount(data.count);
            setCodeSuccess(true);
          } else {
            toast.error("인증번호가 올바르지 않습니다.");
          }
        },
        onError: (error) => {
          toast.error("인증에 실패했습니다.");
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!formData) return;

    const requestBody = {
      company: formData.company,
      position: formData.position,
      input: formData.input,
      url: formData.url,
      email: formData.email,
      accessCode: parseInt(formData.accessCode, 10),
      resume: {
        major: formData.major,
        universityName: formData.universityName,
        gpa: parseFloat(formData.gpa) || 0.0,
        career: formData.career,
        languageScore: formData.languageScore,
        certificate: formData.certificate,
      },
    };

    navigate("/analysis", {
      state: { requestBody },
    });

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (codeSuccess && termsChecked && privacyChecked) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  }, [codeSuccess, termsChecked, privacyChecked]);

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <Info />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.resume}>
            <span className={styles.title}>내 이력서</span>
            <div className={styles.resumeContent}>
              <div className={styles.school}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>학교 이름</span>
                  <input
                    placeholder="예시) 경희대학교"
                    maxLength={100}
                    {...register("universityName", {
                      onChange: (e) => {
                        setUniversityNameLength(e.target.value.length);
                      },
                    })}
                  />
                  <div className={styles.charCount}>{universityNameLength}/100</div>
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>
                    학점 <span className={styles.hint}>(4.5 기준)</span>
                  </span>
                  <input
                    placeholder="예시) 4.1"
                    maxLength={100}
                    {...register("gpa", {
                      pattern: {
                        value: /^(?:\d+|\d*\.\d+)$/, // 숫자 또는 숫자.숫자 형태만 허용
                        message: "숫자만 입력해야 합니다.",
                      },
                      onChange: (e) => {
                        setGpaLength(e.target.value.length);
                      },
                    })}
                    className={`${errors.gpa ? styles.errorInput : ""}`}
                  />
                  <div className={styles.charCountContainer}>
                    {errors.gpa && <span className={styles.errorText}>{errors.gpa.message}</span>}
                    <span className={styles.charCount}>{gpaLength}/100</span>
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>전공</span>
                <input
                  placeholder="예시) 컴퓨터공학과"
                  maxLength={100}
                  {...register("major", {
                    onChange: (e) => {
                      setMajorLength(e.target.value.length);
                    },
                  })}
                />
                <div className={styles.charCount}>{majorLength}/100</div>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>경력 및 수상 실적</span>
                <textarea
                  maxLength={100}
                  {...register("career", {
                    onChange: (e) => {
                      setCareerLength(e.target.value.length);
                      const textarea = e.target;
                      textarea.style.height = "3.5rem";
                      textarea.style.height = textarea.scrollHeight + "px";
                    },
                  })}
                  placeholder="예시) 2023.01 ~ 2023.02: 삼성전자 인턴십, 2022.03 ~ 2022.12: LG디스플레이 연구개발팀"
                />
                <div className={styles.charCount}>{careerLength}/100</div>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>어학 성적</span>
                <textarea
                  maxLength={100}
                  {...register("languageScore", {
                    onChange: (e) => {
                      setLanguageScoreLength(e.target.value.length);
                      const textarea = e.target;
                      textarea.style.height = "3.5rem";
                      textarea.style.height = textarea.scrollHeight + "px";
                    },
                  })}
                  placeholder="예시) 토익 900점, 오픽 IH"
                />
                <div className={styles.charCount}>{languageScoreLength}/100</div>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>자격증</span>
                <textarea
                  maxLength={100}
                  {...register("certificate", {
                    onChange: (e) => {
                      setCertificateLength(e.target.value.length);
                      const textarea = e.target;
                      textarea.style.height = "3.5rem";
                      textarea.style.height = textarea.scrollHeight + "px";
                    },
                  })}
                  placeholder="예시) 정보처리기사, 컴퓨터활용능력 1급"
                />
                <div className={styles.charCount}>{certificateLength}/100</div>
              </div>
            </div>
          </div>

          <div className={styles.introduction}>
            <div>
              <div className={styles.companyAndJob}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>지원 회사명</span>
                  <input
                    maxLength={100}
                    {...register("company", {
                      required: "지원 회사명을 입력해주세요.",
                      onChange: (e) => {
                        setCompanyLength(e.target.value.length);
                      },
                    })}
                    placeholder="예시) 삼성전자"
                  />
                  <div className={styles.infoRow}>
                    {errors.company && <div className={styles.errorText}>{errors.company.message}</div>}
                    <div className={styles.charCount}>{companyLength}/100</div>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>지원 직무</span>
                  <input
                    maxLength={100}
                    {...register("position", {
                      required: "지원 직무를 입력해주세요.",
                      onChange: (e) => {
                        setPositionLength(e.target.value.length);
                      },
                    })}
                    placeholder="예시) 네트워크 사업부 sw 개발"
                  />
                  <div className={styles.infoRow}>
                    {errors.position && <div className={styles.errorText}>{errors.position.message}</div>}
                    <div className={styles.charCount}>{positionLength}/100</div>
                  </div>
                </div>
              </div>
              <div className={styles.urlInputGroup}>
                <span className={styles.inputLabel}>지원 공고 사이트 url</span>
                <input
                  maxLength={100}
                  {...register("url", {
                    onChange: (e) => {
                      setUrlLength(e.target.value.length);
                    },
                  })}
                />
                <div className={styles.charCount}>{urlLength}/100</div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.introductionTitle}>자기소개서</span>
              <div className={styles.introductionContentWrapper}>
                <textarea
                  className={styles.introductionContent}
                  maxLength={10000}
                  {...register("input", {
                    required: "자기소개서를 입력해주세요.",
                    onChange: (e) => {
                      setInputLength(e.target.value.length);
                    },
                  })}
                  placeholder={`자기소개서의 질문 문항과 대답 문항을 같이 작성해주세요.
                \n\n예시)\n1. 삼성전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. 700자 (영문작성 시 1400자) 이내\n\n삼성전자의 네트워크 사업부에서 차세대 네트워크 기술 개발에 기여하며, 글로벌 시장에서 경쟁력 있는 소프트웨어 솔루션을 제공하고 싶습니다...`}
                />
                <div className={styles.infoRow}>
                  {errors.input && <div className={styles.errorText}>{errors.input.message}</div>}
                  <div className={styles.charCount}>{inputLength}/10000</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.emailVerification}>
            <div className={styles.inputWithButton}>
              <input
                className={`${styles.emailInput} ${isDisabledEmail ? styles.disabledInput : ""}`}
                maxLength={100}
                {...register("email")}
                placeholder="example@khu.ac.kr"
                disabled={isDisabledEmail}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={isDisabledEmail}
                className={`${styles.sendCodeButton} ${isDisabledEmail ? styles.disabled : ""}`}
              >
                인증번호 전송
              </button>
            </div>
            {isCodeSent && (
              <div className={styles.inputWithButton}>
                <input
                  className={`${styles.codeInput} ${isDisabledCode ? styles.disabledInput : ""}`}
                  {...register("accessCode")}
                  maxLength={6}
                  placeholder="인증번호 입력"
                />
                <button
                  type="button"
                  className={`${styles.verifyCodeButton} ${isDisabledCode ? styles.disabled : ""}`}
                  onClick={handleVerifyCode}
                  disabled={isDisabledCode}
                >
                  인증번호 확인
                </button>
              </div>
            )}
          </div>

          <div className={styles.save}>
            {remainingTime !== null && remainingTime > 0 && (
              <div className={styles.timerText}>인증 및 분석 남은 시간: {formatTime(remainingTime)}</div>
            )}
            <div className={styles.agreement}>
              <div className={styles.agreementItem}>
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="termsCheck"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="termsCheck" className={styles.label}>
                    이용약관에 동의합니다.
                  </label>
                </div>
                <span className={styles.viewButton} onClick={() => setShowTermsModal(true)}>
                  &gt;
                </span>
              </div>
              <div className={styles.agreementItem}>
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    id="privacyCheck"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <label htmlFor="privacyCheck" className={styles.label}>
                    개인정보처리방침에 동의합니다.
                  </label>
                </div>
                <span className={styles.viewButton} onClick={() => setShowPrivacyModal(true)}>
                  &gt;
                </span>
              </div>
            </div>
            <span className={styles.text}>위 자기소개서를 기반으로 분석을 진행합니다.</span>
            <button type="submit" className={styles.saveButton} disabled={!isVerified}>
              AI 분석 시작하기
            </button>
          </div>
        </form>
      </div>
      <AnalysisConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        count={count}
      />
      {emailPending && <EmailSendModal />}
      {codePending && <VerifyCodeModal />}
      {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} isPrivacy />}
    </div>
  );
}

export default Analyze;
