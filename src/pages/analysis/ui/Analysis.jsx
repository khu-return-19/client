import React, { useState } from "react";
import styles from "./Analysis.module.scss";

function Analysis() {
  const [isActive, setIsActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.analysis}>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
        <div className={styles.iconSection}>
          <img
            src={isActive ? "/sidebarIconActive.png" : "/sidebarIcon.png"}
            alt=""
            className={styles.sidebarIcon}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
        </div>
        <div></div>
      </div>
      <div>내 분석 레포트</div>
    </div>
  );
}

export default Analysis;
