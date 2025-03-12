import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "shared/sidebar";
import styles from "./AboutLayout.module.scss";

function AboutLayout() {
  const location = useLocation();

  const titles = {
    "/about/intro": "서비스 소개",
    "/about/evaluation": "3D 역량 평가란?",
    "/about/team": "구성원",
  };

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <div className={styles.headerImage}>
          <img src="/aboutImage.png" alt="aboutImage" className={styles.aboutImage} />
          <div className={styles.headerTitle}>{titles[location.pathname] || "페이지"}</div>
        </div>

        <div className={styles.container}>
          <Sidebar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutLayout;
