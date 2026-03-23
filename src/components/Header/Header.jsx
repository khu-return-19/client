import { Link, useLocation } from "react-router-dom";
import PERTINEO from "assets/icons/PERTINEO.svg";

const NAV_ITEMS = [
  { label: "공지사항", path: "/notice" },
  { label: "서비스 소개", path: "/service-introduction" },
  { label: "주요 사이트", path: "#" },
  { label: "자기소개서 분석", path: "/input-page/auth" },
];


function Header({ theme = "light" }) {
  const location = useLocation();

  const isDark = theme === "dark";

  return (
    <header
      className={`w-full fixed top-0 z-50 backdrop-blur-[4px] shadow-[0px_4px_12px_rgba(0,0,0,0.06)] h-[clamp(52px,calc(2.5vw+28px),64px)] flex items-center justify-center ${
        isDark
          ? "bg-white/20 text-[#EEEEEE]"
          : "bg-white text-[#717171]"
      }`}
    >
      <div className="w-[clamp(800px,83.3vw,1200px)] h-[clamp(20px,calc(2.083vw+0px),30px)] mx-auto flex items-center">
        <div className="w-[clamp(400px,calc(41.667vw+0px),600px)] h-[clamp(20px,calc(2.083vw+0px),30px)] flex items-center">
          <Link to="/">
            <img src={PERTINEO} alt="PERTINEO" />
          </Link>

          {/* Navigation 탭 영역 */}
          <nav className="w-[clamp(266px,calc(27.917vw+0px),400px)] h-[clamp(20px,calc(2.083vw+0px),30px)] flex items-center justify-between ml-[clamp(40px,calc(4.167vw+0px),60px)]">
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
    </header>
  );
}

export default Header;
