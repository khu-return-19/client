import React from "react";
import styles from "./Evaluation3D.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection, EvaluationMethod, UtilizationValue } from "layouts/evaluation3D";
import GoToMainButton from "components/shared/goToMainButton";

function Evaluation3D() {
  return (
    <div className={styles.evaluation3D}>
      <div className={styles.wrapper}>
        <Breadcrumb paths={["서비스 소개", "3D 역량분석이란?"]} />
        <TitleSection />
        <EvaluationMethod />
        <UtilizationValue />
      </div>
      <GoToMainButton />
    </div>
  );
}

export default Evaluation3D;
