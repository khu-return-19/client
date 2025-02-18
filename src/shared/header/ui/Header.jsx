import React from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";

function Header() {
  const { isLoggedIn, userInfo, login, logout } = useAuth();

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
          <a href="/analysis" className={styles.menu}>
            분석 보고서
          </a>
          {isLoggedIn ? (
            <div className={styles.authSection}>
              <span className={styles.userName}>{userInfo.name}님</span>
              <div>|</div>
              <div className={styles.logout} onClick={logout}>
                로그아웃
              </div>
            </div>
          ) : (
            <div className={styles.login} onClick={login}>
              로그인
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
