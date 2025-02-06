import React from "react";
import { MyInfo, ReviewHistory } from "layouts/dashboard";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <MyInfo />
      <ReviewHistory />
    </div>
  );
}

export default Dashboard;
