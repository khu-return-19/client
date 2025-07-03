import React from "react";
import styles from "./AgreementSection.module.scss";

function AgreementSection({
  termsChecked,
  privacyChecked,
  onTermsChange,
  onPrivacyChange,
  onShowTermsModal,
  onShowPrivacyModal,
  onSubmit,
  isVerified,
  remainingTime,
  formatTime,
}) {
  return (
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
              onChange={onTermsChange}
              className={styles.checkbox}
            />
            <label htmlFor="termsCheck" className={styles.label}>
              이용약관에 동의합니다.
            </label>
          </div>
          <span className={styles.viewButton} onClick={onShowTermsModal}>
            &gt;
          </span>
        </div>

        <div className={styles.agreementItem}>
          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id="privacyCheck"
              checked={privacyChecked}
              onChange={onPrivacyChange}
              className={styles.checkbox}
            />
            <label htmlFor="privacyCheck" className={styles.label}>
              개인정보처리방침에 동의합니다.
            </label>
          </div>
          <span className={styles.viewButton} onClick={onShowPrivacyModal}>
            &gt;
          </span>
        </div>
      </div>

      <span className={styles.text}>위 자기소개서를 기반으로 분석을 진행합니다.</span>

      <button type="submit" className={styles.saveButton} disabled={!isVerified} onClick={onSubmit}>
        AI 분석 시작하기
      </button>
    </div>
  );
}

export default AgreementSection;
