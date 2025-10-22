import React from "react";
import styles from "./AnalysisError.module.scss";

const AnalysisError: React.FC = () => {
  return (
    <div className={styles.analysisError}>
      <div className={styles.wrapper}>
        <img src="/shared/warning-icon.png" alt="" />
        <span className={styles.title}>자기소개서 분석에 실패했습니다.</span>
        <span className={styles.description}>
          실패의 원인은 다음과 같을 수 있습니다. <br /> <br />
          <div className={styles.case}>
            ‣ 자기소개서가 너무 짧거나, 자기소개서로 판단되지 않는 입력에 의한 분석 요청 반려 <br />
            ‣ 적절하지 못한 지원 기업 및 직무(존재하지 않는 기업 또는 직무)로 인한 분석 요청 반려 <br />
            ‣ Pertineo 내부 에러로 인한 분석 실패 또는 API limit 초과에 의한 요청 실패 <br />
          </div>
          <br />
          올바른 입력을 다시 제출하거나 잠시후 다시 시도해주세요.
        </span>
      </div>
    </div>
  );
};

export default AnalysisError;
