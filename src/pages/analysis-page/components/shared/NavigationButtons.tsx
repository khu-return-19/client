interface NavigationButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const btnStyle =
  "w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors";

export default function NavigationButtons({ onPrev, onNext }: NavigationButtonsProps) {
  return (
    <div className="flex justify-center gap-[16px] pt-[clamp(40px,4.2vw,60px)] pb-[clamp(40px,4.2vw,60px)]">
      {onPrev && (
        <button onClick={onPrev} className={btnStyle}>
          이전
        </button>
      )}
      {onNext && (
        <button onClick={onNext} className={btnStyle}>
          다음
        </button>
      )}
    </div>
  );
}
