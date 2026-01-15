import React from "react";
import styles from "./Popup.module.scss";

function Popup({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>📢 공지사항</h2>
        <p>
          2026년 1월 14일 하루 동안 발생한 장애에 대해 조치가 
          <br /> 완료되었으며, 불편을 드려 죄송합니다.
        </p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default Popup;
