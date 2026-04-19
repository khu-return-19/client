import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import XIcon from "assets/icons/x.svg";
import LogoWhite from "assets/icons/logo_white.svg";
import { SESSION_STORAGE_KEY } from "api/sessionApi";
import { ANALYSIS_REPORT_KEY } from "pages/analysis-page/AnalysisPage";

const SUB_ITEMS = {
  "주요 사이트": [
    { label: "미래인재센터", path: "https://goodjob.khu.ac.kr/" },
    { label: "취창업스쿨", path: "https://goodjob.khu.ac.kr/s2/s2_2_2.php" },
    { label: "상담신청", path: "https://aladdin.khu.ac.kr/portfolio/ptfol/cusl/main/index.do" },
    { label: "Info21", path: "https://portal.khu.ac.kr/" },
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
  const navigate = useNavigate();
  const [openSub, setOpenSub] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleItemClick = (item) => {
    if (SUB_ITEMS[item.label]) {
      setOpenSub(openSub === item.label ? null : item.label);
      setSelected(item.label);
    } else if (item.label === "자기소개서 분석") {
      const isSessionActive = !!sessionStorage.getItem(SESSION_STORAGE_KEY);
      const hasReport = !!sessionStorage.getItem(ANALYSIS_REPORT_KEY);
      if (isSessionActive && hasReport) {
        sessionStorage.setItem("showReportModal", "true");
      }
      setSelected(item.label);
      onClose();
      navigate("/input-page/auth");
    } else {
      setSelected(item.label);
      onClose();
    }
  };

  return (
    <>
<div className="fixed top-0 left-0 right-0 z-50 bg-white flex flex-col overflow-hidden" style={{ minHeight: '55%', maxHeight: 'calc(100%)' }}>
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
        <nav className="flex-1 px-[20px] pt-[30px] flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = item.path && location.pathname.startsWith(item.path);
            const hasSub = !!SUB_ITEMS[item.label];
            const isSubOpen = openSub === item.label;
            const isHighlighted = selected === item.label || isSubOpen || (!selected && !!isActive);

            return (
              <div key={item.label}>
                {item.path && !hasSub ? (
                  <Link
                    to={item.path}
                    onClick={() => handleItemClick(item)}
                    className={`flex items-center gap-[4px] py-[18px] text-[16px] font-[400] leading-[150%] ${isHighlighted ? "text-[#09469F]" : "text-[#717171]"}`}
                  >
                    <span style={{ opacity: isHighlighted ? 1 : 0, fontSize: '30px', fontWeight: '300', lineHeight: '1' }}>|</span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-[4px] py-[18px] text-[16px] font-[400] leading-[150%] text-left ${isHighlighted ? "text-[#09469F]" : "text-[#717171]"}`}
                  >
                    <span style={{ opacity: isHighlighted ? 1 : 0, fontSize: '30px', fontWeight: '300', lineHeight: '1' }}>|</span>
                    {item.label}
                  </button>
                )}

                {hasSub && isSubOpen && (
                  <div className="flex flex-col pl-[20px] pb-[8px]">
                    {SUB_ITEMS[item.label].map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="side-sub-item py-[10px] text-[16px] font-[400] leading-[150%]"
                        style={{ color: "#717171" }}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="pb-[40px]" />
        </nav>
      </div>
    </>
  );
}

export default SideMenu;
