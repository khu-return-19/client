import React from "react";
import styles from "./ResumeSelect.module.scss";
import { Info, ResumeTable } from "components/analysis-select";

function ResumeSelect() {
  return (
    <div className={styles.resumeSelect}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <Info />
        <div className={styles.resumeSection}>
          <div className={styles.subtitle}>나의 자기소개서</div>
          <ResumeTable />
        </div>
      </div>
    </div>
  );
}

export default ResumeSelect;
