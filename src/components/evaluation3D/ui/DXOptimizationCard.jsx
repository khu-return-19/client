import React from "react";
import styles from "./DXOptimizationCard.module.scss";

function DXOptimizationCard() {
  return (
    <div className={styles.DXOptimizationCard}>
      <span className={styles.title}>DX 시대 최적화</span>
      <span className={styles.content}>
        WEF(세계경제포럼) 보고서에서 언급된 바와 같이, 새 기술 및 능력을 지속적으로 학습해야 하는 미래 업무 환경에 대비
        가능
      </span>
    </div>
  );
}

export default DXOptimizationCard;
