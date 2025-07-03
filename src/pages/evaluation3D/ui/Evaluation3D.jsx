import React from "react";
import styles from "./Evaluation3D.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection, EvaluationMethod, UtilizationValue, Bottom } from "layouts/evaluation3D";

function Evaluation3D() {
  return (
    <div className={styles.evaluation3D}>
      <Breadcrumb paths={["서비스 소개", "3D 역량분석이란?"]} />
      <div className={styles.wrapper}>
        <TitleSection />
        <EvaluationMethod />
        <UtilizationValue />
      </div>
      <Bottom />
    </div>
  );
}

export default Evaluation3D;
