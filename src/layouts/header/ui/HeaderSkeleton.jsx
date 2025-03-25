import React from "react";
import styles from "./HeaderSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImage} src="/logo.png" alt="로고" />
        </a>
        <div className={styles.rightSection}>
          <div className={styles.rightTopSection}>
            <div className={styles.mySection}>
              <Skeleton width="78px" height="21px" />
              <div>|</div>
              <Skeleton width="51px" height="21px" />
            </div>
            <div className={styles.authSection}>
              <Skeleton width="51px" height="21px" />
              <Skeleton width="48px" height="21px" />
            </div>
          </div>
          <div className={styles.menuSection}>
            <div className={styles.menu}>
              <Skeleton width="72px" height="24px" />
            </div>
            <div className={styles.menu}>
              <Skeleton width="72px" height="24px" />
            </div>
            <div className={styles.analysis}>
              <Skeleton width="99px" height="24px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSkeleton;
