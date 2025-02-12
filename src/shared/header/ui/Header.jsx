import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import axios from "axios";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "홍길동";

  const handleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      window.location.href = "https://zackinthebox.shop/oauth2/authorization/google";
    }
  };

  useEffect(() => {
    axios
      .get("https://zackinthebox.shop/give", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          console.log(response.data);
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logo} src="/logo.png" alt="로고" />
        </a>
        <div className={styles.menuSection}>
          <a href="/" className={styles.menu}>
            서비스 소개
          </a>
          <a href="/" className={styles.menu}>
            공지사항
          </a>
          <a href="/profile" className={styles.menu}>
            내정보
          </a>
          <a href="/" className={styles.menu}>
            자기소개서 분석
          </a>
          {isLoggedIn ? (
            <div className={styles.authSection}>
              <span className={styles.userName}>{userName}님</span>
              <div>|</div>
              <a href="" className={styles.logout} onClick={handleAuth}>
                로그아웃
              </a>
            </div>
          ) : (
            <a href="https://zackinthebox.shop/oauth2/authorization/google" className={styles.login}>
              로그인
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
