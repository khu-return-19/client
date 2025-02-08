import React from "react";
import styles from "./MyInfo.module.scss";
import { MyInfoTitle, Name, CoverLetter } from "components/dashboard/myInfo";

function MyInfo() {
  return (
    <div className={styles.myInfo}>
      <div className={styles.myInfoInner}>
        <MyInfoTitle className={styles.MyInfoTitle} />
        <div className={styles.content}>
          <Name />
          <CoverLetter />
        </div>
      </div>
    </div>
  );
}

export default MyInfo;
