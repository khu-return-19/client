import React, { useState, useRef, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AnalysisConfirmModal, EmailSendModal, VerifyCodeModal } from "layouts/analyze";
import { toast } from "react-toastify";
import { useSendVerifyEmail, useVerifyEmailCode } from "api/emailApi";

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
  const timerRef = useRef(null);

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

          // ⏱ 10분 타이머 시작
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
            setIsVerified(true);
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

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.titleText}>3D 역량분석</span>
            <div className={styles.subTitle}>
              <span className={styles.subTitleText}>
                자기소개서 분석을 통해 원하는 기업에 합격하기 위해 필요한 역량을 알아볼 수 있습니다.
              </span>
            </div>
          </div>
          <div className={styles.notice}>
            <img src="/shared/info.png" alt="" className={styles.infoImage} />
            <div>
              <span className={styles.highlight}>이용 방법 안내</span> <br />
              <span>지원하고자 하는 기업과 직무를 입력하고, 자기소개서와 이력서를 등록해 보세요.</span> <br />
              <span>AI가 내용을 분석하여 부족한 부분과 개선 방향을 안내해 드립니다.</span> <br />
              <br />
              <span className={styles.highlight}>이용시 주의 사항</span> <br />
              <span>1. 하루 3회만 분석이 가능합니다. 매일 자정 이용가능 횟수가 초기화됩니다.</span> <br />
              <span>2. 빈 문항을 반복적으로 입력할 경우, 서비스 이용 횟수가 차감될 수 있습니다.</span>
              <br />
              <span>
                3. 합격 확률 및 3D 점수화 같은 수치는 예년 합격자들과의 상대적인 차이로 산출된 점수힙니다.
                <span className={styles.highlight}>(시간에 따라 수치가 다르게 나타날 수 있습니다.)</span>
              </span>
              <br />
              <span>4. AI는 실수할 수 있습니다.</span> <br />
              <span>5. 기타 발생한 버그는 bqudmals@khu.ac.kr로 제보 부탁드립니다.</span> <br />
            </div>
          </div>
        </div>
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
    </div>
  );
}

export default Analyze;
