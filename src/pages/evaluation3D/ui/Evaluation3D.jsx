import React from "react";
import styles from "./Evaluation3D.module.scss";
import GoToMainButton from "components/shared/goToMainButton";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection, EvaluationMethod, UtilizationValue } from "layouts/evaluation3D";

function Evaluation3D() {
  const navigate = useNavigate();

  return (
    <div className={styles.evaluation3D}>
      <Breadcrumb paths={["서비스 소개", "3D 역량분석이란?"]} />
      <div className={styles.wrapper}>
        <TitleSection />
        <EvaluationMethod />
        <UtilizationValue />
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.title}>서비스에 대해 더 구체적으로 알아보고 싶다면?</div>
          <div className={styles.button}>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/intro");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>서비스 소개</span>
              <span className={styles.description}>자기소개서 역량평가 AI에 대한 전반적인 소개글과 활용 방안</span>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/team");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>구성원</span>
              <span className={styles.description}>pertineo 제작 구성원을 소개</span>
            </div>
          </div>
        </div>
        <GoToMainButton />
      </div>
    </div>
  );
}

export default Evaluation3D;
