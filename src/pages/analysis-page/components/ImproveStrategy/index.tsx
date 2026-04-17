import ConclusionSection from "./ConclusionSection";
import StrategySection from "./StrategySection";
import NavigationButtons from "../shared/NavigationButtons";

interface ImproveStrategyProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ImproveStrategy({ onNext, onPrev }: ImproveStrategyProps) {
  return (
    <div className="flex flex-col gap-[clamp(32px,3.9vw,56px)]">
      <ConclusionSection />
      <div className="border-t border-[#AEB4BC]" />
      <StrategySection />
      <NavigationButtons onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
