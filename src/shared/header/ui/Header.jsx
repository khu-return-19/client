import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useAuth } from "auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { LoginModal } from "shared/loginModal";
import { FiExternalLink } from "react-icons/fi";
import { HeaderSkeleton } from "layouts/header";
import { useMediaQuery } from "react-responsive";

const Header = React.memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navigate = useNavigate();

  const { isLoggedIn, userInfo, logout, loading } = useAuth();

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  if (loading) {
    return <HeaderSkeleton />;
  }

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img className={styles.logoImage} src="/logo.png" alt="로고" />
        </a>

        {isMobile && (
          <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        )}

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
                onClick={() => (window.location.href = "/intro")}
              >
                서비스 소개
              </span>
              <div className={`${styles.dropdown} ${hoveredMenu === "about" ? styles.activeAbout : ""}`}>
                <span onClick={() => (window.location.href = "/intro")}>서비스 소개</span>
                <span onClick={() => (window.location.href = "/evaluation")}>3D 역량분석이란?</span>
                <span onClick={() => (window.location.href = "/team")}>구성원</span>
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
            <div className={styles.analysis} onClick={() => navigate("/analyze")}>
              <span className={styles.analysisText}>자기소개서 분석</span>
            </div>
          </div>
        </div>
      </div>
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
      {isMobile && menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuItem} onClick={() => toggleDropdown("about")}>
            서비스 소개
          </div>
          {openDropdown === "about" && (
            <div className={styles.mobileDropdown}>
              <span onClick={() => (window.location.href = "/intro")}>서비스 소개</span>
              <span onClick={() => (window.location.href = "/evaluation")}>3D 역량분석이란?</span>
              <span onClick={() => (window.location.href = "/team")}>구성원</span>
              <span onClick={() => (window.location.href = "/notice")}>공지사항</span>
            </div>
          )}
          <div className={styles.mobileMenuItem} onClick={() => toggleDropdown("sitemap")}>
            주요 사이트
          </div>
          {openDropdown === "sitemap" && (
            <div className={styles.mobileDropdown}>
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
          )}
          <div className={styles.mobileMenuItem} onClick={() => (window.location.href = "/analyze")}>
            자기소개서 분석
          </div>
          {isLoggedIn && (
            <div className={styles.mobileMenuItem} onClick={() => (window.location.href = "/analysis")}>
              내 분석 레포트
            </div>
          )}
          {isLoggedIn && (
            <div className={styles.mobileMenuItem} onClick={() => (window.location.href = "/resume")}>
              내 이력서
            </div>
          )}
          {!isLoggedIn && (
            <div className={styles.mobileMenuItem} onClick={() => setLoginModalOpen(true)}>
              로그인
            </div>
          )}
          {isLoggedIn && (
            <div className={`${styles.mobileMenuItem} ${styles.logout}`} onClick={() => logout()}>
              <span className={styles.userName}>{userInfo.name}님</span>
              <span> 로그아웃</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default Header;
