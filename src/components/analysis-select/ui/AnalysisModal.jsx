import React, { useEffect, useState } from "react";
import styles from "./AnalysisModal.module.scss";
import api from "api/axiosInstance";
import { useNavigate } from "react-router-dom";

function AnalysisModal({ onClose, onSubmit, resumeId }) {
  const [resume, setResume] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResume();
  }, [resumeId]);

  const fetchResume = async () => {
    try {
      const response = await api.get(`/resume/${resumeId}`);
      setResume(response.data);
    } catch (error) {
      console.error("자기소개서를 불러오는 중 오류 발생:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/analysis", { id: resumeId });
      const analysisId = response.data?.id;
      if (analysisId) {
        navigate(`/analysis/${analysisId}`);
      } else {
        console.error("분석 ID가 반환되지 않았습니다.");
      }
    } catch (error) {
      console.error("분석 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>홍길동님의 자기소개서</div>
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
