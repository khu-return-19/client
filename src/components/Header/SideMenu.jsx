import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import XIcon from "assets/icons/x.svg";
import LogoWhite from "assets/icons/logo_white.svg";

const SUB_ITEMS = {
  "주요 사이트": [
    { label: "미래인재센터", path: "#" },
    { label: "취창업스쿨", path: "#" },
    { label: "상담신청", path: "#" },
    { label: "Info21", path: "#" },
  ],
};

const NAV_ITEMS = [
  { label: "공지사항", path: "/notice" },
  { label: "서비스 소개", path: "/service-introduction" },
  { label: "주요 사이트", path: null },
  { label: "자기소개서 분석", path: "/input-page/auth" },
];

function SideMenu({ onClose }) {
  const location = useLocation();
  const [openSub, setOpenSub] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleItemClick = (item) => {
    if (SUB_ITEMS[item.label]) {
      setOpenSub(openSub === item.label ? null : item.label);
      setSelected(item.label);
    } else {
      setSelected(item.label);
      onClose();
    }
  };

  return (
    <>
      <style>{`
        .side-nav-item { color: #717171 !important; }
        .side-nav-item:hover { color: #09469F !important; }
        .side-nav-item.active { color: #09469F !important; }
        .side-sub-item { color: #717171 !important; }
        .side-sub-item:hover { color: #09469F !important; }
      `}</style>

      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      <div className="fixed top-0 right-0 z-50 w-[280px] h-full bg-white flex flex-col shadow-[-4px_0_16px_rgba(0,0,0,0.1)]">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-[20px] h-[clamp(52px,calc(2.5vw+28px),64px)] border-b border-[#EEEEEE]">
          <Link to="/" onClick={onClose}>
            <img src={LogoWhite} alt="PERTINEO" />
          </Link>
          <button onClick={onClose}>
            <img src={XIcon} alt="닫기" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* 메뉴 목록 */}
        <nav className="flex-1 px-[20px] pt-[24px] flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = item.path && location.pathname.startsWith(item.path);
            const hasSub = !!SUB_ITEMS[item.label];
            const isSubOpen = openSub === item.label;
            const isHighlighted = selected === item.label || !!isActive || isSubOpen;

            return (
              <div key={item.label}>
                {item.path && !hasSub ? (
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item)}
                    className={`side-nav-item flex items-center gap-[8px] py-[14px] text-[16px] font-[400] leading-[150%]${isHighlighted ? " active" : ""}`}
                  >
                    <span style={{ opacity: isHighlighted ? 1 : 0 }}>|</span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`side-nav-item w-full flex items-center gap-[8px] py-[14px] text-[16px] font-[400] leading-[150%] text-left${isHighlighted ? " active" : ""}`}
                  >
                    <span style={{ opacity: isHighlighted ? 1 : 0 }}>|</span>
                    {item.label}
                  </button>
                )}

                {hasSub && isSubOpen && (
                  <div className="flex flex-col pl-[20px] pb-[8px]">
                    {SUB_ITEMS[item.label].map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        onClick={onClose}
                        className="side-sub-item py-[10px] text-[16px] font-[400] leading-[150%]"
                        style={{ color: "#717171" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
