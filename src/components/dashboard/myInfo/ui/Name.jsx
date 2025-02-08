import React from "react";
import styles from "./Name.module.scss";

function Name() {
  return (
    <div className={styles.name}>
      <span>이름</span>
      <span>곽병민</span>
    </div>
  );
}

export default Name;
