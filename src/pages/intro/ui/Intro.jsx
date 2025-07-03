import React from "react";
import styles from "./Intro.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection, KeyFeatures, ApplicationCases, Bottom } from "layouts/intro";

function Intro() {
  return (
    <div className={styles.intro}>
      <Breadcrumb paths={["서비스 소개"]} />
      <div className={styles.wrapper}>
        <TitleSection />
        <KeyFeatures />
        <ApplicationCases />
      </div>
      <Bottom />
    </div>
  );
}

export default Intro;
