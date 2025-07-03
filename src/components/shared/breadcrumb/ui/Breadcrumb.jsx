import React from "react";
import styles from "./Breadcrumb.module.scss";

function Breadcrumb({ paths = [] }) {
  return (
    <div className={styles.breadcrumb}>
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span>{path}</span>
          {/* 마지막 항목이 아니면 > 표시 */}
          {index < paths.length - 1 && <div className={styles.separator}>&gt;</div>}
          {/* 항목이 하나뿐이면도 > 표시 */}
          {paths.length === 1 && <div className={styles.separator}>&gt;</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
