import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { LoginModal } from "shared/loginModal";
import { FiExternalLink } from "react-icons/fi";
import { HeaderSkeleton } from "layouts/header";

const Header = React.memo(() => {
  const { isLoggedIn, userInfo, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const [hoveredMenu, setHoveredMenu] = useState(null);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  if (loading) {
    return <HeaderSkeleton />;
  }

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
                <span className={styles.userName}>{userInfo.name}님</span>
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
            <div className={styles.rightTopSection}>
              <div className={styles.login} onClick={() => setLoginModalOpen(true)}>
                로그인
              </div>
            </div>
          )}

          <div className={`${styles.menuSection} ${menuOpen ? styles.active : ""}`}>
            {/* 서비스 소개 */}
            <div
              className={styles.menuItem}
              onMouseEnter={() => setHoveredMenu("about")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span
                className={`${styles.menu} ${hoveredMenu === "about" ? styles.activeAbout : ""}`}
                onClick={() => (window.location.href = "/about/intro")}
              >
                서비스 소개
              </span>
              <div className={`${styles.dropdown} ${hoveredMenu === "about" ? styles.activeAbout : ""}`}>
                <span onClick={() => (window.location.href = "/about/intro")}>서비스 소개</span>
                <span onClick={() => (window.location.href = "/about/evaluation")}>3D 역량분석이란?</span>
                <span onClick={() => (window.location.href = "/about/team")}>구성원</span>
                <span onClick={() => (window.location.href = "/notice")}>공지사항</span>
              </div>
            </div>

            {/* 주요 사이트 */}
            <div
              className={styles.menuItem}
              onMouseEnter={() => setHoveredMenu("sitemap")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span
                className={`${styles.menu} ${hoveredMenu === "sitemap" ? styles.activeSitemap : ""}`}
                onClick={() => (window.location.href = "/")}
              >
                주요 사이트
              </span>
              <div className={`${styles.dropdown} ${hoveredMenu === "sitemap" ? styles.activeSitemap : ""}`}>
                <span onClick={() => window.open("https://goodjob.khu.ac.kr/", "_blank")}>
                  미래인재센터 <FiExternalLink className={styles.externalIcon} />
                </span>
                <span onClick={() => window.open("https://_", "_blank")}>
                  취창업스쿨 <FiExternalLink className={styles.externalIcon} />
                </span>
                <span onClick={() => window.open("https://_", "_blank")}>
                  상담신청 <FiExternalLink className={styles.externalIcon} />
                </span>
              </div>
            </div>

            {/* 자기소개서 분석 */}
            <div className={styles.analysis}>
              <span className={styles.analysisText} onClick={() => (window.location.href = "/analyze")}>
                자기소개서 분석
              </span>
            </div>
          </div>
        </div>
      </div>
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </div>
  );
});

export default Header;
