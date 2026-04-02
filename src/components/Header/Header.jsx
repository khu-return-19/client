import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoWhite from "assets/icons/logo_white.svg";
import LogoBlack from "assets/icons/logo_black.svg";
import SideButton from "assets/icons/sideButton.svg";
import SideMenu from "./SideMenu";

const NAV_ITEMS = [
  { label: "공지사항", path: "/notice" },
  { label: "서비스 소개", path: "/service-introduction" },
  { label: "주요 사이트", path: "#" },
  { label: "자기소개서 분석", path: "/input-page/auth" },
];


function Header({ theme = "light" }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 backdrop-blur-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.06)] h-[clamp(52px,calc(2.5vw+28px),64px)] flex items-center justify-center ${
          isDark
            ? "bg-white/20 text-[#ffd0d0]"
            : "bg-white text-[#717171]"
        }`}
      >
        {/* 데스크탑 */}
        <div className="hidden min-[894px]:flex w-full max-w-[1200px] mx-auto items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src={isDark ? LogoBlack : LogoWhite} alt="PERTINEO" />
            </Link>
            <nav className="flex items-center justify-between ml-[4.167vw] gap-[2.778vw]">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-[clamp(12px,calc(1.042vw+2px),16px)] whitespace-nowrap transition-colors pb-[2px] ${isActive
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
