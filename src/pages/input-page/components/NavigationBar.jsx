import { Link, useLocation } from "react-router-dom";

const TAB_ITEMS = [
  { label: "이메일 인증 및 약관 동의", path: "/input-page/auth" },
  { label: "기업/직무", path: "/input-page/company" },
  { label: "이력서", path: "/input-page/resume" },
  { label: "자기소개서", path: "/input-page/self-introduction" },
];

function NavigationBar() {
  const location = useLocation();

  return (
    <nav className="w-full px-[120px] flex mt-[60px]">
      {TAB_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 h-[68px] flex items-center justify-center text-[20px] font-normal leading-[120%] font-['Pretendard'] transition-colors ${
              isActive
                ? "text-[#2876F1] border-b-[3px] border-[#2876F1]"
                : "text-[#717171] border-b-[1px] border-[#717171] hover:text-[#2876F1]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavigationBar;
