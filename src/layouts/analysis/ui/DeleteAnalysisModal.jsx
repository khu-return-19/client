import React from "react";
import styles from "./DeleteAnalysisModal.module.scss";
import Modal from "shared/modal";
import { useDeleteAnalyses } from "api/analysisApi";
import { toast } from "react-toastify";

function DeleteAnalysisModal({ isOpen, onClose, analysisId }) {
  const deleteAnalysis = useDeleteAnalyses();

  const handleDeleteAnalysis = () => {
    deleteAnalysis.mutate(analysisId, {
      onSuccess: () => {
        toast.success("분석 레포트가 삭제되었습니다.");
        onClose();
      },
      onError: (error) => {
        console.error("삭제 중 오류 발생:", error);
        toast.error("삭제 중 오류가 발생했습니다.");
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
