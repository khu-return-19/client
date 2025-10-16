import React from "react";
import styles from "./SampleReport.module.scss";

interface SampleReportProps {
  onClose: () => void;
}

const SampleReport: React.FC<SampleReportProps> = ({ onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
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
};

export default SampleReport;
