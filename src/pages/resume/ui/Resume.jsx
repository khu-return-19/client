import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./Resume.module.scss";
import { useFetchResume } from "api/resumeApi";

function Resume() {
  const { register, handleSubmit, setValue } = useForm();
  const { data: resumeData, isLoading } = useFetchResume();

  useEffect(() => {
    if (resumeData) {
      Object.entries(resumeData).forEach(([key, value]) => {
        setValue(key, value ?? "");
      });
    }
  }, [resumeData]);

  const onSubmit = (data) => {
    console.log("이력서 데이터:", data);
  };

  return (
    <div className={styles.resume}>
      <div className={styles.wrapper}>
        <div className={styles.myResume}>
          <div>내 이력서</div>
          <div className={styles.notice}>
            <img src="/infoImage.png" alt="" className={styles.infoImage} />
            <div>
              <div>입력 안내사항</div>
              <li>구체적인 경험과 성과를 담아 작성해 주세요.</li>
              <li>(예: "팀 프로젝트 참여" 대신 "5인 팀 리더로 프로젝트 수행, 매출 20% 증가") </li>
              <li>이력서에 민감한 개인정보(주민등록번호, 계좌번호 등)는 입력하지 마세요.</li>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.school}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>학교 이름</div>
              <input {...register("universityName")} />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>학점</div>
              <input {...register("gpa")} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>전공</div>
            <input {...register("major")} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>경력 및 수상 실적</div>
            <input {...register("career")} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>어학 성적</div>
            <input {...register("languageScore")} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>자격증</div>
            <input {...register("certificate")} />
          </div>

          <div className={styles.save}>
            <div>위 이력서를 기반으로 분석을 진행합니다.</div>
            <button type="submit" className={styles.saveButton}>
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resume;
