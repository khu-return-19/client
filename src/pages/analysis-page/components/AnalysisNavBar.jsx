const NAV_ITEMS = [
  { label: "분석 요약", num: "①" },
  { label: "역량 진단", num: "②" },
  { label: "개선 전략", num: "③" },
  { label: "적용 · 재평가", num: "④" },
];

function AnalysisNavBar({ active, onChange }) {
  return (
    <nav className="w-full max-w-[1200px] mx-auto flex mt-[60px]">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          onClick={() => onChange(item.label)}
          className={`flex-1 h-[68px] flex items-center justify-center text-[16px] min-[894px]:text-[20px] font-medium leading-[120%] font-['Pretendard'] transition-colors text-center ${
            active === item.label
              ? "text-[#2876F1] border-b-[3px] border-[#2876F1]"
              : "text-[#717171] border-b-[1px] border-[#717171] hover:text-[#2876F1]"
          }`}
        >
          {item.num} {item.label}
        </button>
      ))}
    </nav>
  );
}

export default AnalysisNavBar;
