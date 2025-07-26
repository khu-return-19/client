import React from "react";
import styles from "./Intro.module.scss";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection, KeyFeatures, ApplicationCases } from "layouts/intro";
import GoToMainButton from "components/shared/goToMainButton";

function Intro() {
  return (
    <div className={styles.intro}>
      <div className={styles.wrapper}>
        <Breadcrumb paths={["서비스 소개"]} />
        <TitleSection />
        <KeyFeatures />
        <ApplicationCases />
      </div>
      <GoToMainButton />
    </div>
  );
}

export default Intro;
