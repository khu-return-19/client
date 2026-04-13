interface AnalysisHeaderProps {
  title: string;
}

export default function AnalysisHeader({ title }: AnalysisHeaderProps) {
  return <h2 className="text-navy900 font-semibold text-2xl mb-10">{title}</h2>;
}
