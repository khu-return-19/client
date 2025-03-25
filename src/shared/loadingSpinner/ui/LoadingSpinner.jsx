import React from "react";
import styles from "./LoadingSpinner.module.scss";

function LoadingSpinner() {
  return (
    <div className={styles.lpadingSpinner}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
