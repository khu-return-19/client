import cn from "utils/cn";
interface AnalysisHeaderProps {
  title: string;
  className?: string;
}

export default function AnalysisHeader({
  title,
  className,
}: AnalysisHeaderProps) {
  return (
    <h2 className={cn(`text-navy900 font-semibold text-2xl mb-10`, className)}>
      {title}
    </h2>
  );
}
