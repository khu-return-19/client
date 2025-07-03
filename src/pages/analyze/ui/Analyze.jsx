import React, { useState, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AnalysisConfirmModal, EmailSendModal, VerifyCodeModal, Info, ResumeSection } from "layouts/analyze";
import { TermsModal, PrivacyModal } from "components/analyze";
import { useAnalyzeForm } from "../hooks/useAnalyzeForm";

function Analyze() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [companyLength, setCompanyLength] = useState(0);
  const [positionLength, setPositionLength] = useState(0);
  const [urlLength, setUrlLength] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [count, setCount] = useState(0);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [lengths, setLengths] = useState({
    universityName: 0,
    major: 0,
    gpa: 0,
    career: 0,
    languageScore: 0,
    certificate: 0,
  });

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const {
    isCodeSent,
    emailSuccess,
    codeSuccess,
    remainingTime,
    emailPending,
    codePending,
    handleSendCode,
    handleVerifyCode,
  } = useAnalyzeForm(getValues, setCount);

  const isDisabledEmail = emailPending || emailSuccess;
  const isDisabledCode = codePending || codeSuccess;

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
          <ResumeSection register={register} errors={errors} lengths={lengths} setLengths={setLengths} />
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
