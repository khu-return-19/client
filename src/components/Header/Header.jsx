import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoWhite from "assets/icons/logo_white.svg";
import LogoBlack from "assets/icons/logo_black.svg";
import SideButton from "assets/icons/sideButton.svg";
import SideMenu from "./SideMenu";
import { SESSION_STORAGE_KEY } from "api/sessionApi";
import { ANALYSIS_REPORT_KEY } from "pages/analysis-page/AnalysisPage";

const NAV_ITEMS = [
  { label: "공지사항", path: "/notice" },
  { label: "서비스 소개", path: "/service-introduction" },
  { label: "주요 사이트", path: null },
  { label: "자기소개서 분석", path: "/input-page/auth" },
];

const MAJOR_SITES = [
  { label: "미래인재센터", url: "https://goodjob.khu.ac.kr/" },
  { label: "취창업스쿨", url: "https://goodjob.khu.ac.kr/s2/s2_2_2.php" },
  {
    label: "상담신청",
    url: "https://aladdin.khu.ac.kr/portfolio/ptfol/cusl/main/index.do",
  },
  { label: "Info21", url: "https://portal.khu.ac.kr/" },
];

function Header({ theme = "light" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAnalysisClick = (e) => {
    const isSessionActive = !!sessionStorage.getItem(SESSION_STORAGE_KEY);
    const hasReport = !!sessionStorage.getItem(ANALYSIS_REPORT_KEY);
    if (isSessionActive && hasReport) {
      e.preventDefault();
      sessionStorage.setItem("showReportModal", "true");
      navigate("/input-page/auth");
    }
  };

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 backdrop-blur-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.06)] h-[clamp(52px,calc(2.5vw+28px),64px)] flex items-center justify-center ${
          isDark ? "bg-white/20 text-[#ffd0d0]" : "bg-white text-[#717171]"
        }`}
      >
        {/* 데스크탑 */}
        <div className="hidden min-[894px]:flex w-full px-[40px] items-center">
          <div className="w-full max-w-[1200px] mx-auto flex items-center">
            <div className="flex items-center">
              <Link to="/">
                <img src={isDark ? LogoBlack : LogoWhite} alt="PERTINEO" />
              </Link>
              <nav className="flex items-center justify-between ml-[4.167vw] gap-[2.778vw]">
                {NAV_ITEMS.map((item) => {
                  if (item.label === "주요 사이트") {
                    return (
                      <div
                        key="주요 사이트"
                        className="relative w-fit"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <button
                          className={`text-[clamp(12px,calc(1.042vw+2px),16px)] whitespace-nowrap transition-colors pb-[2px] ${
                            isDark
                              ? "text-[#EEEEEE] hover:text-[#B3E5FF]"
                              : "text-[#717171] hover:text-[#09469F]"
                          }`}
                        >
                          주요 사이트
                        </button>
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              className="absolute top-full py-[8px] rounded-[8px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] min-w-[160px] bg-white"
                              style={{ left: "50%", x: "-50%" }}
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                              {MAJOR_SITES.map((site) => (
                                <a
                                  key={site.label}
                                  href={site.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center py-[15px] text-[14px] whitespace-nowrap transition-colors text-[#717171] hover:text-navy900"
                                >
                                  {site.label}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  const isActive =
                    item.path && location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={
                        item.label === "자기소개서 분석"
                          ? handleAnalysisClick
                          : undefined
                      }
                      className={`text-[clamp(12px,calc(1.042vw+2px),16px)] whitespace-nowrap transition-colors pb-[2px] ${
                        isActive
                          ? isDark
                            ? "text-[#B3E5FF] border-b-[2px] border-[#B3E5FF]"
                            : "text-[#09469F] border-b-[2px] border-[#09469F]"
                          : isDark
                            ? "text-[#EEEEEE] hover:text-[#B3E5FF]"
                            : "text-[#717171] hover:text-[#09469F]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* 모바일/태블릿 */}
        <div className="flex min-[894px]:hidden w-full px-[20px] items-center justify-between">
          <Link to="/">
            <img src={isDark ? LogoBlack : LogoWhite} alt="PERTINEO" />
          </Link>
          <button onClick={() => setMenuOpen(true)}>
            <img src={SideButton} alt="메뉴" className="w-[24px] h-[24px]" />
          </button>
        </div>
      </header>

      {menuOpen && <SideMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

export default Header;
