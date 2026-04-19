interface SectionProgressBarProps {
  index: number;
  total?: number;
  onIndexClick?: (index: number) => void;
}

export default function SectionProgressBar({
  index,
  total = 5,
  onIndexClick,
}: SectionProgressBarProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[15px] rounded-full bg-transparent py-4 px-3 cursor-pointer z-50">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === index;
        return (
          <div
            key={i}
            onClick={() => onIndexClick?.(i)}
            className="py-1 px-2 cursor-pointer"
          >
            <div
              className={`h-[3px] w-[29px] rounded-full transition-colors duration-300 ${isActive ? "bg-[#717171]/80" : "bg-[#717171]/30"}`}
            />
          </div>
        );
      })}
    </div>
  );
}
