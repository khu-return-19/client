import React from "react";
import styles from "./SampleReport.module.scss";

function SampleReport({ onClose }) {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
        <div className={styles.scrollContainer}>
          <img src="/landing/sample-report.png" alt="예시 레포트" className={styles.modalImage} />
        </div>
      </div>
    </div>
  );
}

export default SampleReport;
