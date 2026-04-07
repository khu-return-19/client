import cn from "utils/cn";

interface ExplainSectionLayoutProps {
  children: React.ReactNode;
  className?: string;
}
export default function ExplainSectionLayout({
  children,
  className,
}: ExplainSectionLayoutProps) {
  return (
    <section
      className={cn(
        "flex flex-col px-5 pt-[80px] pb-[50px] bg-[#F4F6F8] w-screen h-fit",
        "lg:px-[120px] lg:pt-[90px] lg:h-screen",
        "md:px-[176px] md:pt-[130px]",
        "sm:px-[138px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
