import React from "react";
import styles from "./Analysis.module.scss";
import { AnalysisDetail, AnalysisSidebar } from "layouts/analysis";

function Analysis() {
  return (
    <div className={styles.analysis}>
      <AnalysisSidebar />
      <AnalysisDetail />
    </div>
  );
}

export default Analysis;
