import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  const location = useLocation();
  const activeMenu = location.pathname;

  return (
    <div className={styles.sidebar}>
      <Link to="intro" className={`${styles.menu} ${activeMenu === "/about/intro" ? styles.active : ""}`}>
        <div>서비스 소개</div>
      </Link>
      <Link to="evaluation" className={`${styles.menu} ${activeMenu === "/about/evaluation" ? styles.active : ""}`}>
        <div>3D 역량 평가란?</div>
      </Link>
      <Link to="team" className={`${styles.menu} ${activeMenu === "/about/team" ? styles.active : ""}`}>
        <div>구성원</div>
      </Link>
    </div>
  );
}

export default Sidebar;
