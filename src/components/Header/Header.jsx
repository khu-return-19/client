import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "공지사항", path: "#" },
  { label: "서비스 소개", path: "#" },
  { label: "주요 사이트", path: "#" },
  { label: "자기소개서 분석", path: "/input-page" },
];


function Header({ theme = "light" }) {
  const location = useLocation();

  const isDark = theme === "dark";

  return (
    <header
      className={`w-full h-[64px] sticky top-0 z-50 backdrop-blur-[4px] ${
        isDark
          ? "bg-white/20 text-[#EEEEEE]"
          : "bg-white text-[#717171]"
      }`}
      style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="w-full max-w-[1200px] h-full mx-auto flex items-center">
        {/* LOGO 영역 */}
        <div className="w-[146px] flex items-center">
          <Link to="/" className="text-[18px] font-bold">
            로고
          </Link>
        </div>
        <div className="w-[60px]" />

        {/* Navigation 영역 */}
        <nav className="w-[397px] flex items-center gap-[20px]">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[14px] font-['Pretendard'] transition-colors pb-[2px] ${
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
        <div className="w-[597px]" />
      </div>
    </header>
  );
}

export default Header;
