interface ExplainSectionLayoutProps {
  children: React.ReactNode;
}
export default function ExplainSectionLayout({
  children,
}: ExplainSectionLayoutProps) {
  return (
    <section className="flex flex-col px-[120px] min-[1441px]:px-[220px] pt-[100px] min-[1441px]:pt-[150px] pb-[50px] bg-[#F4F6F8] w-screen h-screen">
      {children}
    </section>
  );
}
