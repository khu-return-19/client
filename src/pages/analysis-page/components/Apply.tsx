import { useNavigate } from "react-router-dom";

export default function Apply({ onPrev }: { onPrev?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[56px]">
      <div>적용 · 재평가</div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-[16px] pt-[60px] pb-[60px]">
        <button
          onClick={onPrev}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          이전
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          메인으로
        </button>
      </div>
    </div>
  );
}
