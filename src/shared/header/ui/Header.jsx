import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = React.memo(() => {
  const { isLoggedIn, userInfo, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImage} src="/logo.png" alt="로고" />
        </a>

        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={`${styles.menuSection} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" className={styles.menu} onClick={handleMenuClose}>
            서비스 소개
          </Link>
          <Link to="/" className={styles.menu} onClick={handleMenuClose}>
            공지사항
          </Link>
          <Link to="/profile" className={styles.menu} onClick={handleMenuClose}>
            내정보
          </Link>

          <Link to="/analysis" className={styles.menu} onClick={handleMenuClose}>
            분석 보고서
          </Link>

          {isLoggedIn ? (
            <div className={styles.authSection}>
              <span className={styles.userName}>{userInfo.name}님</span>
              <div>|</div>
              <div
                className={styles.logout}
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                로그아웃
              </div>
            </div>
          ) : (
            <div
              className={styles.login}
              onClick={() => {
                login();
                handleMenuClose();
              }}
            >
              로그인
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Header;
