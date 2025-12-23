import React, { useState, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AnalysisConfirmModal,
  EmailSendModal,
  VerifyCodeModal,
  Info,
  ResumeSection,
  IntroductionSection,
  EmailVerificationSection,
  AgreementSection,
} from "layouts/analyze";
import { TermsModal, PrivacyModal } from "components/analyze";
import { useAnalyzeForm } from "../hooks/useAnalyzeForm";

export interface FormInput {
  company: string;
  position: string;
  input: string;
  url: string;
  email: string;
  accessCode: string;
  universityName: string;
  major: string;
  gpa: string;
  career: string;
  languageScore: string;
  certificate: string;
}

export interface Lengths {
  universityName: number;
  major: number;
  gpa: number;
  career: number;
  languageScore: number;
  certificate: number;
  company: number;
  position: number;
  input: number;
  url: number;
}

function Analyze() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormInput | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [lengths, setLengths] = useState<Lengths>({
    universityName: 0,
    major: 0,
    gpa: 0,
    career: 0,
    languageScore: 0,
    certificate: 0,
    company: 0,
    position: 0,
    input: 0,
    url: 0,
  });

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>();

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

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
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

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyChecked(e.target.checked);
  };

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <Info />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <ResumeSection register={register} errors={errors} lengths={lengths} setLengths={setLengths} />
          <IntroductionSection register={register} errors={errors} lengths={lengths} setLengths={setLengths} />
          <EmailVerificationSection
            register={register}
            isCodeSent={isCodeSent}
            isDisabledEmail={emailPending || emailSuccess}
            isDisabledCode={codePending || codeSuccess}
            handleSendCode={handleSendCode}
            handleVerifyCode={handleVerifyCode}
          />
          <AgreementSection
            termsChecked={termsChecked}
            privacyChecked={privacyChecked}
            onTermsChange={handleTermsChange}
            onPrivacyChange={handlePrivacyChange}
            onShowTermsModal={() => setShowTermsModal(true)}
            onShowPrivacyModal={() => setShowPrivacyModal(true)}
            onSubmit={handleSubmit(onSubmit)}
            isVerified={isVerified}
            remainingTime={remainingTime}
            formatTime={formatTime}
          />
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
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
    </div>
  );
}

export default Analyze;
