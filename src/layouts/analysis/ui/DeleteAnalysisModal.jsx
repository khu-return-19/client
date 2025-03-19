import React from "react";
import styles from "./DeleteAnalysisModal.module.scss";
import Modal from "shared/modal";
import { useDeleteAnalyses } from "api/analysisApi";

function DeleteAnalysisModal({ isOpen, onClose, analysisId }) {
  const deleteAnalysis = useDeleteAnalyses();

  const handleDeleteAnalysis = () => {
    deleteAnalysis.mutate(analysisId, {
      onSuccess: () => {
        alert("삭제가 완료되었습니다.");
        onClose();
      },
      onError: (error) => {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제 실패");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleDeleteAnalysis}>
      <div className={styles.content}>
        <div className={styles.title}>분석 레포트를 삭제하시겠습니까?</div>
        <div className={styles.info}>삭제 후 복구할 수 없습니다.</div>
      </div>
    </Modal>
  );
}

export default DeleteAnalysisModal;
