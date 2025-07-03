import React from "react";
import styles from "./Member.module.scss";

function Member() {
  return (
    <div className={styles.member}>
      <div className={styles.card}>
        <img src="/team/byeongmin-kwak.jpg" alt="" />
        <div className={styles.description}>
          <span className={styles.name}>곽병민</span>
          <span className={styles.info}>
            컴퓨터공학과 <br />
            Front-end <br />
            bqudmals@khu.ac.kr
          </span>
        </div>
      </div>
      <div className={styles.card}>
        <img src="/team/seungpyo-hong.jpeg" alt="" />
        <div className={styles.description}>
          <span className={styles.name}>홍승표</span>
          <span className={styles.info}>
            컴퓨터공학과 <br />
            Back-end <br />
            zackinthebox@khu.ac.kr
          </span>
        </div>
      </div>
      <div className={styles.card}>
        <img src="/team/wonjin-kim.jpeg" alt="" />
        <div className={styles.description}>
          <span className={styles.name}>김원진</span>
          <span className={styles.info}>
            컴퓨터공학과 <br />
            AI <br />
            wjkim9653@gmail.com
          </span>
        </div>
      </div>
      <div className={styles.card}>
        <img src="/team/yeongrae-noh.jpeg" alt="" />
        <div className={styles.description}>
          <span className={styles.name}>노영래</span>
          <span className={styles.info}>
            AI <br />
            kireo0893@gmail.com
          </span>
        </div>
      </div>
      <div className={styles.card}>
        <img src="/team/hyorim-kim.jpeg" alt="" />
        <div className={styles.description}>
          <span className={styles.name}>김효림</span>
          <span className={styles.info}>
            디지털콘텐츠학과 <br />
            Design <br />
            kimyohada226@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}

export default Member;
