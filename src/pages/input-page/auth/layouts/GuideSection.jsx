import GuideBox from "../components/GuideBox";

function GuideSection() {
  return (
    <div className="w-[1080px] mx-auto mt-[72px]">
      <h2 className="text-[24px] font-medium leading-[120%] text-black font-['Pretendard'] text-center">
        이용 방법 및 주의 사항
      </h2>
      <div className="mt-[32px]">
        <GuideBox />
      </div>
    </div>
  );
}

export default GuideSection;
