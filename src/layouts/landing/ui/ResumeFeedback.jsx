import React from "react";
import styles from "./ResumeFeedback.module.scss";

function ResumeFeedback() {
  return (
    <>
      <div className={styles.titleSection}>
        <span className={styles.title}>자기소개서 평가 및 수정</span>
        <span className={styles.description}>개선전략을 반영한 자기소개서 수정 및 수정 후 합격가능성 재평가</span>
      </div>
      <div className={styles.cardSection}>
        <div className={styles.beforeCard}>
          <span>수정 전</span>
          <span>
            00동아리에서 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움이 있었습니다.
            <br />
            이에 따라 내용 요약 및 불필요한 부분 정리를 통해 회의록 작성의 효율성을 개선하였습니다.
          </span>
        </div>
        <div className={styles.afterCard}>
          <span className={styles.color}>수정 후</span>
          <span>
            00동아리 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움을 인식했습니다.
            <br />
            <span className={styles.size}>
              000를 활용한 <span className={styles.color}>실시간 협업 시스템 도입</span>과, 핵심 내용 요약 및 불필요한
              부분 정리를 통해
              <br />
              회의록 작성의 <span className={styles.color}>효율성을 약 20% 이상 개선</span>하였습니다.
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ResumeFeedback;
