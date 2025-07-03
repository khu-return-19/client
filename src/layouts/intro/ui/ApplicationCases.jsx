import React from "react";
import styles from "./ApplicationCases.module.scss";
import { CompanyRecruitCard, ConsultingCard, CompetencyManagementCard } from "components/intro";

function ApplicationCases() {
  return (
    <div className={styles.applicationCases}>
      <span className={styles.title}>적용 사례</span>
      <div className={styles.cardSection}>
        <CompanyRecruitCard />
        <ConsultingCard />
        <CompetencyManagementCard />
      </div>
    </div>
  );
}

export default ApplicationCases;
