import React from "react";
import styles from "./Team.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { Professor, Member, Bottom } from "layouts/team";

function Team() {
  return (
    <div className={styles.team}>
      <Breadcrumb paths={["서비스 소개", "구성원"]} />
      <div className={styles.wrapper}>
        <div className={styles.title}>Pertineo 구성원</div>
        <Professor />
        <Member />
      </div>
      <Bottom />
    </div>
  );
}

export default Team;
