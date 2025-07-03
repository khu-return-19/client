import React from "react";
import styles from "./EmailVerificationSection.module.scss";

function EmailVerificationSection({
  register,
  isCodeSent,
  isDisabledEmail,
  isDisabledCode,
  handleSendCode,
  handleVerifyCode,
}) {
  return (
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
  );
}

export default EmailVerificationSection;
