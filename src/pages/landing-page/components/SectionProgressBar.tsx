interface SectionProgressBarProps {
  index: number;
  total?: number;
}

export default function SectionProgressBar({
  index,
  total = 5,
}: SectionProgressBarProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[22px] rounded-full bg-transparent py-4 px-3">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === index;
        return (
          <div
            key={i}
            className={`h-[3px] w-[29px] rounded-full transition-colors duration-300 ${
              isActive ? "bg-[#717171]/80" : "bg-[#717171]/30"
            }`}
          />
        );
      })}
    </div>
  );
}