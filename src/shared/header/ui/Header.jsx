import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { LoginModal } from "shared/loginModal";

const Header = React.memo(() => {
  const { isLoggedIn, userInfo, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  // TODO: Optional Chaining 수정 필요
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImage} src="/logo.png" alt="로고" />
        </a>

        <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <div className={styles.rightTopSection}>
              <div className={styles.mySection}>
                <Link to="/analysis" className={styles.report}>
                  내 분석 레포트
                </Link>
                <div>|</div>
                <Link to="/resume" className={styles.resume}>
                  내 이력서
                </Link>
              </div>
              <div className={styles.authSection}>
                <span className={styles.userName}>{userInfo?.name}님</span>
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
            </div>
          ) : (
            <div className={styles.login} onClick={() => setLoginModalOpen(true)}>
              로그인
            </div>
          )}

          <div className={`${styles.menuSection} ${menuOpen ? styles.active : ""}`}>
            <Link to="/about/intro" className={styles.menu} onClick={handleMenuClose}>
              서비스 소개
            </Link>
            <Link to="/" className={styles.menu} onClick={handleMenuClose}>
              주요 사이트
            </Link>
            <div className={styles.analysis}>
              <Link to="/" className={styles.analysisText} onClick={handleMenuClose}>
                자기소개서 분석
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </div>
  );
});

export default Header;
