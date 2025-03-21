import React from "react";
import styles from "./NotFound.module.scss";
import GoToMainButton from "components/shared/goToMainButton";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>404 ERROR</div>
          <div className={styles.textArea}>
            <div className={styles.subTitle}>죄송합니다, 찾을 수 없는 페이지입니다.</div>
            <div className={styles.text}>
              존재하지 않는 주소를 입력하셨거나, <br />
              요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
            </div>
          </div>
        </div>
        <GoToMainButton />
      </div>
    </div>
  );
}

export default NotFound;
