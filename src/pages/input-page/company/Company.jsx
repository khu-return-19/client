import InputPageLayout from "../layouts/InputPageLayout";
import CompanySection from "./layouts/CompanySection";

function Company() {
  return (
    <InputPageLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] text-[14px] font-normal leading-[160%] text-[#717171] font-['Pretendard'] mt-[12px] max-[893px]:text-[12px] max-[893px]:mt-[8px]">
          <span className="text-[#2876F1]">*</span> 는 필수 입력 사항입니다.
        </div>
      </div>
      <CompanySection />
    </InputPageLayout>
  )
}

export default Company;
