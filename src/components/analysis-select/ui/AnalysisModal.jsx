import React from "react";
import styles from "./AnalysisModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchResume } from "api/resumeApi";
import { useCreateAnalysis } from "api/analysisApi";
import { toast } from "react-toastify";
import SkeletonAnalysisModal from "./SkeletonAnalysisModal";
import { useAuth } from "auth/authContext";
import { useQueryClient } from "@tanstack/react-query";

function AnalysisModal({ onClose, resumeId }) {
  const navigate = useNavigate();

  const { data: resume, isLoading, isError } = useFetchResume(resumeId);
  const createAnalysisMutation = useCreateAnalysis();
  const { userInfo } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    createAnalysisMutation.mutate(resumeId, {
      onSuccess: (data) => {
        const analysisId = data?.id;
        if (analysisId) {
          navigate(`/analysis/${analysisId}`);
          toast.success("자기소개서 분석 요청이 성공했습니다!");
          queryClient.invalidateQueries(["authStatus"]);
        } else {
          console.error("분석 ID가 반환되지 않았습니다.");
        }
      },
      onError: (error) => {
        console.error("분석 요청 중 오류 발생:", error);
        toast.error("분석 요청 중 오류가 발생했습니다.");
      },
    });
  };

  if (isLoading) return <SkeletonAnalysisModal />;
  if (isError) return <div>자기소개서를 불러오는 데 오류가 발생했습니다.</div>;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>{userInfo.name}님의 자기소개서</div>
        <div className={styles.content}>
          <div>{resume?.title}</div>
          <div>{resume?.description}</div>
          <div className={styles.body}>{resume?.content}</div>
          <div className={styles.noticeText}>위 자기소개서를 기반으로 분석을 진행합니다.</div>
          <div className={styles.buttonGroup}>
            <div className={styles.confirm} onClick={handleSubmit}>
              확인
            </div>
            <div onClick={onClose} className={styles.cancel}>
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisModal;
