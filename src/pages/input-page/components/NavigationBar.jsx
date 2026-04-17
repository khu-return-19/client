import { Link, useLocation, useNavigate } from "react-router-dom";
import { SESSION_STORAGE_KEY } from "api/sessionApi";

const TAB_ITEMS = [
  { label: "이메일 인증 및 약관 동의", path: "/input-page/auth" },
  { label: "기업/직무", path: "/input-page/company" },
  { label: "이력서", path: "/input-page/resume" },
  { label: "자기소개서", path: "/input-page/self-introduction" },
];

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSessionActive = !!sessionStorage.getItem(SESSION_STORAGE_KEY);

  const handleClick = (e, path) => {
    if (path !== "/input-page/auth" && !isSessionActive) {
      e.preventDefault();
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="w-full max-w-[1200px] mx-auto flex mt-[60px]">
      {TAB_ITEMS.map((item, index) => {
        const isActive = location.pathname === item.path;
        const isDisabled = item.path !== "/input-page/auth" && !isSessionActive;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={(e) => handleClick(e, item.path)}
            className={`flex-1 h-[68px] flex items-center justify-center text-[16px] min-[894px]:text-[20px] font-normal leading-[120%] font-['Pretendard'] transition-colors text-center ${
              isActive
                ? "text-[#2876F1] border-b-[3px] border-[#2876F1]"
                : isDisabled
                  ? "text-[#C0C0C0] border-b-[1px] border-[#C0C0C0] cursor-default"
                  : "text-[#717171] border-b-[1px] border-[#717171] hover:text-[#2876F1]"
            }`}
          >
            {index === 0 ? (
              <>
                <span className="hidden min-[894px]:inline">{item.label}</span>
                <span className="inline min-[894px]:hidden">인증 및 동의</span>
              </>
            ) : (
              item.label
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavigationBar;
