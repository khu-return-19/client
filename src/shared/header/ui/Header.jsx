import React from "react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.menu}>login</div>
      </div>
    </div>
  );
}

export default Header;
