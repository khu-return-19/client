interface SectionCardProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

function SectionCard({ title, children, className }: SectionCardProps) {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-[16px] font-semibold text-[#111] mb-[16px]">{title}</h3>
      )}
      {children}
    </div>
  );
}

export default SectionCard;
