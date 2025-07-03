import React from "react";
import styles from "./Bottom.module.scss";
import GoToMainButton from "components/shared/goToMainButton";
import { useNavigate } from "react-router-dom";

function Bottom() {
  const navigate = useNavigate();

  return (
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
  );
}

export default Bottom;
