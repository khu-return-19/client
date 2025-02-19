import React from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";
import { Link } from "react-router-dom";

const Header = React.memo(() => {
  const { isLoggedIn, userInfo, login, logout } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logo} src="/logo.png" alt="로고" />
        </a>
        <div className={styles.menuSection}>
          <Link to="/" className={styles.menu}>
            서비스 소개
          </Link>
          <Link to="/" className={styles.menu}>
            공지사항
          </Link>
          <Link to="/profile" className={styles.menu}>
            내정보
          </Link>

          <Link to="/analysis" className={styles.menu}>
            분석 보고서
          </Link>
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
});

export default Header;
