import React, { useState } from "react";
import { MyInfo, ReviewHistory } from "layouts/dashboard";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(null);

  const handleExpand = (area) => {
    setIsExpanded(area);
  };

  const handleClose = () => {
    setIsExpanded(null);
  };

  let gridClass = "";
  if (isExpanded === "myInfo") {
    gridClass = styles.myInfoExpanded;
  } else if (isExpanded === "reviewHistory") {
    gridClass = styles.reviewHistoryExpanded;
  } else {
    gridClass = styles.defaultGrid;
  }

  return (
    <div className={`${styles.dashboard} ${gridClass}`}>
      <div
        className={`${styles.dashboardItem} ${isExpanded === "myInfo" ? styles.expanded : ""}`}
        onClick={() => handleExpand("myInfo")}
      >
        <MyInfo />
      </div>
      <div
        className={`${styles.dashboardItem} ${isExpanded === "reviewHistory" ? styles.expanded : ""}`}
        onClick={() => handleExpand("reviewHistory")}
      >
        <ReviewHistory />
      </div>
    </div>
  );
}

export default Dashboard;
