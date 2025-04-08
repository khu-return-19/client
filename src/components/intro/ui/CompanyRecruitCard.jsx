import React from "react";
import styles from "./CompanyRecruitCard.module.scss";

function CompanyRecruitCard() {
  return (
    <div className={styles.companyRecruitCard}>
      <span className={styles.title}>기업 채용</span>
      <span className={styles.content}>
        수백~수천 명의 지원자를 AI로 빠르게 분석하여 <br /> 상위 우수 인재를 선별하고, 부족 역량을 파악해 보충 학습
        기회를 제공
      </span>
    </div>
  );
}

export default CompanyRecruitCard;
