import React from "react";
import styles from "./Analysis.module.scss";
import { useNavigate } from "react-router-dom";
import { AnalysisTable } from "components/analysis";

function Analysis() {
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    navigate("/analysis/select");
  };

  return (
    <div className={styles.analysis}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.analysisSection}>
          <div className={styles.subtitle}>나의 자기소개서 분석 보고서</div>
          <AnalysisTable />
          <div className={styles.buttonGroup}>
            <div className={styles.create} onClick={handleAnalyzeClick}>
              새 자기소개서 분석
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
