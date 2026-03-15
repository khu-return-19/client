import warningIcon from "assets/icons/warning.svg";
import closeIcon from "assets/icons/x.svg";

function AnalysisModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] h-[320px] bg-white rounded-[10px] flex flex-col mx-[24px] shadow-[0_0_10px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pt-[20px] pr-[20px]">
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-[16px] pb-[32px]">
          <img src={warningIcon} alt="warning" className="w-[40px] h-[40px]" />
          <div className="flex flex-col items-center gap-[8px]">
            <p className="text-[20px] font-medium leading-[120%] text-black text-center">
              하루 최대 분석 횟수를 초과했습니다.
            </p>
            <p className="text-[16px] font-normal leading-[150%] text-[#111111] text-center">
              매일 자정 이용 가능 횟수가 초기화됩니다.
            </p>
          </div>
        </div>

        <div className="flex justify-center pb-[48px]">
          <button
            onClick={onClose}
            className="w-[200px] h-[52px] rounded-md text-[16px] font-medium text-[#717171] bg-white shadow-[0_0_10px_rgba(0,0,0,0.12)]
              hover:border hover:border-[#09469F] hover:text-[#09469F]
              active:border active:border-[#09469F] active:text-[#09469F]
              transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisModal;
