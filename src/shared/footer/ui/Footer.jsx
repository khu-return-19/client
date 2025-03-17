import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.policy}>
        <Link to="/privacy-policy">개인정보처리방침</Link>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.text}>
            <div>서울캠퍼스 02447 서울특별시 동대문구 경희대로 26</div>
            <div>국제캠퍼스 17104 경기도 용인시 기흥구 덕영대로 1732</div>
          </div>
          <div className={styles.text}>
            <div>미래혁신원 미래인재센터 서울캠퍼스 : 02-961-0167~8 국제캠퍼스 : 031-201-3061~9</div>
            <div>미래인재센터 오픈랩 서울캠퍼스 : 02-961-0243 국제캠퍼스 : 031-201-3075</div>
          </div>
        </div>
        <div className={styles.copyright}>COPYRIGHT©KYUNG HEE UNIVERSITY. ALL RIGHTS RESERVED.</div>
      </div>
    </div>
  );
}

export default Footer;
