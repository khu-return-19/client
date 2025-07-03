import React from "react";
import styles from "./Bottom.module.scss";
import { useNavigate } from "react-router-dom";

function Bottom() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sampleReport}>
          <span className={styles.title}>
            지금 바로 (Here & Now) <br />
            당신의 자기소개서를 평가받고 수정하고 싶다면?
          </span>
          <div
            className={styles.sampleReportButton}
            onClick={() => {
              navigate("/analyze");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            자기소개서 평가 및 첨삭 받기
          </div>
        </div>
      </div>
    </>
  );
}

export default Bottom;
