import warningIcon from "assets/icons/warning.svg";
import closeIcon from "assets/icons/x.svg";

function ReportExistsModal({ onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] h-auto min-h-[260px] md:h-[320px] bg-white rounded-[10px] flex flex-col mx-[24px] shadow-[0_0_10px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pt-[16px] md:pt-[20px] pr-[16px] md:pr-[20px]">
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeIcon} alt="close" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-[24px] md:gap-[32px] px-[24px] pb-[24px] md:pb-[32px]">
          <img src={warningIcon} alt="warning" className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]" />
          <div className="flex flex-col items-center gap-[8px]">
            <p className="text-[16px] md:text-[20px] font-medium leading-[140%] md:leading-[120%] text-black text-center">
              작성된 보고서가 있습니다. 보고서로 이동하시겠습니까?
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-[10px] md:gap-[12px] pb-[28px] md:pb-[48px] px-[24px] md:px-0">
          <button
            onClick={onClose}
            className="w-full max-w-[140px] md:w-[160px] md:max-w-none h-[40px] md:h-[44px] bg-white rounded-[6px] text-[14px] md:text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-full max-w-[140px] md:w-[160px] md:max-w-none h-[40px] md:h-[44px] bg-white rounded-[6px] text-[14px] md:text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors cursor-pointer"
          >
            이동
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportExistsModal;
