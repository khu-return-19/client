import React, { useState, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AnalysisConfirmModal,
  EmailSendModal,
  VerifyCodeModal,
  Info,
  ResumeSection,
  IntroductionSection,
} from "layouts/analyze";
import { TermsModal, PrivacyModal } from "components/analyze";
import { useAnalyzeForm } from "../hooks/useAnalyzeForm";

function Analyze() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
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
          <IntroductionSection register={register} errors={errors} lengths={lengths} setLengths={setLengths} />
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
