import React from "react";
import styles from "./Analysis.module.scss";
import { AnalysisDetail } from "layouts/analysis";

function Analysis() {
  return (
    <div className={styles.analysis}>
      <AnalysisDetail />
    </div>
  );
}

export default Analysis;
