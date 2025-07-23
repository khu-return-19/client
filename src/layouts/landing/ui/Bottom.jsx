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
            지금 바로 Pertineo에게 <br /> 커리어 컨설팅을 받고싶다면?
          </span>
          <div
            className={styles.sampleReportButton}
            onClick={() => {
              navigate("/analyze");
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
          >
            자기소개서 입력하러 가기
          </div>
        </div>
      </div>
    </>
  );
}

export default Bottom;
