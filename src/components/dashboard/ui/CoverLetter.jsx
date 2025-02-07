import React from "react";
import styles from "./CoverLetter.module.scss";

function CoverLetter() {
  return (
    <div className={styles.coverLetter}>
      <span>자기소개서</span>
      <textarea type="text" value={"자기소개서 내용~~~"} disabled={true} className={styles.textarea} />
    </div>
  );
}

export default CoverLetter;
