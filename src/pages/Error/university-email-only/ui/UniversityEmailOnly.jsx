import React from "react";
import styles from "./UniversityEmailOnly.module.scss";
import GoToMainButton from "components/shared/goToMainButton";

function UniversityEmailOnly() {
  return (
    <div className={styles.universityEmailOnly}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>경희대학교 계정으로만 이용 가능합니다.</div>
          <div className={styles.textArea}>
            <div className={styles.text}>
              현재 로그인 시도한 계정은 경희대학교 이메일이 아니므로 서비스를 이용하실 수 없습니다.
            </div>
          </div>
        </div>
        <GoToMainButton />
      </div>
    </div>
  );
}

export default UniversityEmailOnly;
