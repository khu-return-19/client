import React, { useState } from "react";
import styles from "./OriginalResumeSection.module.scss";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function OriginalResumeSection({ requestBody }) {
  const [inputVisible, setInputVisible] = useState(false);

  if (!requestBody?.input) return null;

  return (
    <>
      <div className={styles.originalResumeButton} onClick={() => setInputVisible((prev) => !prev)}>
        <div>자소서 원본 보기</div>
        {inputVisible ? <AiOutlineUp className={styles.toggleIcon} /> : <AiOutlineDown className={styles.toggleIcon} />}
      </div>

      <div className={`${styles.originalResume} ${inputVisible ? styles.open : ""}`}>
        <div className={styles.resumeTitle}>자기소개서</div>
        <div className={styles.input}>{requestBody?.input}</div>
        <div className={styles.companyAndPosition}>
          <div className={styles.companyWrapper}>
            <div className={styles.subTitle}>지원 회사명</div>
            <div className={styles.input}>{requestBody?.company}</div>
          </div>
          <div className={styles.positionWrapper}>
            <div className={styles.subTitle}>지원 직무</div>
            <div className={styles.input}>{requestBody?.position}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OriginalResumeSection;
