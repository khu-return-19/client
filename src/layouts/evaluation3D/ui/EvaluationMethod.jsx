import React from "react";
import styles from "./EvaluationMethod.module.scss";
import { MultiModalAnalysisCard, DatabaseCard, VisualizationCard } from "components/evaluation3D";

function EvaluationMethod() {
  return (
    <div className={styles.evaluationMethod}>
      <div className={styles.title}>평가 방식</div>
      <div className={styles.content}>
        <MultiModalAnalysisCard />
        <DatabaseCard />
        <VisualizationCard />
      </div>
    </div>
  );
}

export default EvaluationMethod;
