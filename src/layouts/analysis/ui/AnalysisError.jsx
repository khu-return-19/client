import React from "react";
import styles from "./AnalysisError.module.scss";

function AnalysisError() {
  return (
    <div className={styles.analysisError}>
      <div className={styles.wrapper}>
        <img src="/shared/warning-icon.png" alt="" />
        <span className={styles.title}>자기소개서 분석에 실패했습니다.</span>
        <span className={styles.description}>
          분석 요청을 처리할 수 없습니다. <br />
          올바른 자기소개서 양식으로 다시 제출해 주세요.
        </span>
      </div>
    </div>
  );
}

export default AnalysisError;
