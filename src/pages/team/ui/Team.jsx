import React from "react";
import styles from "./Team.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { Professor, Member } from "layouts/team";
import GoToMainButton from "components/shared/goToMainButton";

function Team() {
  return (
    <div className={styles.team}>
      <div className={styles.wrapper}>
        <Breadcrumb paths={["서비스 소개", "구성원"]} />
        <div className={styles.title}>Pertineo 구성원</div>
        <Professor />
        <Member />
      </div>
      <GoToMainButton />
    </div>
  );
}

export default Team;
