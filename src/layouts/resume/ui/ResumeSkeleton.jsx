import React from "react";
import styles from "./ResumeSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ResumeSkeleton() {
  return (
    <div className={styles.resume}>
      <div className={styles.wrapper}>
        <div className={styles.myResume}>
          <div className={styles.title}>내 이력서</div>
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

        <div className={styles.form}>
          <div className={styles.school}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>학교 이름</div>
              <Skeleton height={56} />
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>학점</div>
              <Skeleton height={56} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>전공</div>
            <Skeleton height={56} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>경력 및 수상 실적</div>
            <Skeleton height={56} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>어학 성적</div>
            <Skeleton height={56} />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabel}>자격증</div>
            <Skeleton height={56} />
          </div>

          <div className={styles.save}>
            <button className={styles.saveButton}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeSkeleton;
