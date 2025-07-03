import React from "react";
import styles from "./Professor.module.scss";

function Professor() {
  return (
    <div className={styles.professor}>
      <div className={styles.nameSection}>
        <span className={styles.name}>김양수</span> 교육학 박사
      </div>
      <div className={styles.description}>
        <img src="/team/professor.png" alt="" className={styles.professorImage} />
        <br />
        <span className={styles.title}>연혁</span> <br />
        TTS커리어그룹 대표 및 경희대학교 미래인재센터 겸임교수
        <br /> 2004년~현재 경희대학교 미래인재센터 취창업 컨설팅 담당교수 <br />
        2018년~현재 경희대학교 메이커스페이스 Open Lab 담당교수 <br />
        2023년~현재 경희대학교 KHU Careers Editor 지도교수
        <br /> <br />
        <span className={styles.title}> 저서</span>
        <br />
        마이 포트폴리오 (역)
        <br />
        에잇 블록 협상 모델
      </div>
    </div>
  );
}

export default Professor;
