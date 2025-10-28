import React from "react";
import styles from "./Popup.module.scss";

function Popup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>⚠️ 서버 점검 안내</h2>
        <p>
          현재 서버 점검으로 인해 서비스 이용이 일시 중단되었습니다. <br /> 빠른 시간 내 복구하겠습니다.
        </p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Popup;
