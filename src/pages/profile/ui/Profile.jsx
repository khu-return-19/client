import React, { useState } from "react";
import styles from "./Profile.module.scss";
import ResumeModal from "shared/resumeModal";
import { ResumeDeleteCompleteModal, ResumeDeleteModal, ResumeTable } from "components/profile";
import api from "api/axiosInstance";
import { MyInfo } from "components/shared";
import { toast } from "react-toastify";
import { useCreateResume, useDeleteResume } from "api/resumeApi";
import { useQueryClient } from "@tanstack/react-query";

function Profile() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [selectedResumeTitle, setSelectedResumeTitle] = useState("");
  const [isResumeDeleteModalOpen, setIsResumeDeleteModalOpen] = useState(false);
  const [isResumeDeleteCompleteModalOpen, setIsResumeDeleteCompleteModalOpen] = useState(false);

  const createResumeMutation = useCreateResume();
  const deleteResumeMutation = useDeleteResume();
  const queryClient = useQueryClient();

  const handleCreateResume = (data) => {
    createResumeMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["resumes"]);
        setIsResumeModalOpen(false);
        toast.success("새로운 자기소개서가 추가되었습니다!");
      },
      onError: () => {
        toast.error("자기소개서 추가 중 오류가 발생했습니다.");
      },
    });
  };

  const handleDeleteResume = () => {
    if (selectedResumeId) {
      deleteResumeMutation.mutate(selectedResumeId, {
        onSuccess: () => {
          queryClient.invalidateQueries(["resumes"]);
          setIsResumeDeleteModalOpen(false);
          setIsResumeDeleteCompleteModalOpen(true);
          toast.success("자기소개서를 삭제했습니다!");
        },
        onError: () => {
          toast.error("자기소개서 삭제 중 오류가 발생했습니다.");
        },
      });
    }
  };

  const openCreateModal = () => {
    setIsResumeModalOpen(true);
  };

  const openDeleteModal = (title, resumeId) => {
    setSelectedResumeTitle(title);
    setSelectedResumeId(resumeId);
    setIsResumeDeleteModalOpen(true);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.title}>내 정보</div>
        <div className={styles.horizontalLine}></div>
        <MyInfo />
        <div className={styles.resumesSection}>
          <div className={styles.subtitle}>나의 자기소개서</div>
          <ResumeTable openDeleteModal={openDeleteModal} />
          <div className={styles.buttonGroup}>
            <div className={styles.create} onClick={openCreateModal}>
              새 자기소개서 작성
            </div>
          </div>
        </div>
      </div>
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onSubmit={handleCreateResume}
      />
      {isResumeDeleteModalOpen && (
        <ResumeDeleteModal
          onClose={() => setIsResumeDeleteModalOpen(false)}
          title={selectedResumeTitle}
          onDeleteConfirm={() => handleDeleteResume(selectedResumeId)}
        />
      )}
      {isResumeDeleteCompleteModalOpen && (
        <ResumeDeleteCompleteModal
          onClose={() => setIsResumeDeleteCompleteModalOpen(false)}
          title={selectedResumeTitle}
        />
      )}
    </div>
  );
}

export default Profile;
