import React from "react";
import styles from "./Team.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { Professor, Member, Bottom } from "layouts/team";

function Team() {
  return (
    <div className={styles.team}>
      <Breadcrumb paths={["서비스 소개", "구성원"]} />
      <div className={styles.wrapper}>
        <div className={styles.title}>서비스 제작 구성원 소개</div>
        <Professor />
        <div className={styles.subtitle}>웹서비스 구축</div>
        <Member />
      </div>
      <Bottom />
    </div>
  );
}

export default Team;
