//utils
import { useInView } from "react-intersection-observer";

// components
import ExplainSectionLayout from "../layouts/ExplainSectionLayout";
import SubTitle from "pages/landing-page/components/SubTitle";
import BigArrow from "../.././../assets/icons/BigArrow.svg";
import cn from "utils/cn";

export default function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
  });

  return (
    <ExplainSectionLayout>
      <SubTitle
        title="자기소개서 평가 및 수정"
        discription="개선전략을 반영한 자기소개서 첨삭 및 수정 후 합격가능성을 재평가합니다."
      />
      <div className="w-full flex flex-col items-center relative">
        <div className="mt-20 w-full flex justify-center mb-[100px]">
          <div className="relative w-full flex justify-center">
            <div
              className={cn(
                "absolute left-5 rounded-full flex justify-center bg-[#717171] text-white",
                "w-[62px] py-[8px] text-[14px] -top-[10%]",
                "lg:w-[107px] lg:py-[15px] lg:text-xl lg:font-semibold lg:-top-[20%]",
              )}
            >
              수정 전
            </div>
            <div className="w-full rounded-md border border-dashed border-[#C1D9FF] bg-white pb-[33px] px-5 lg:px-[90px] pt-[46px] text-[14px] lg:text-[16px] leading-relaxed">
              <p className="lg:hidden">
                00동아리에서 부장으로 활동하며 회의록 작성 및 문서 관리 과정에서
                팀원 간 소통의 어려움이 있었습니다. 이에 따라 내용 요약 및
                불필요한 부분 정리를 통해 회의록 작성의{" "}
                <span className="bg-gray-200">효율성을 개선하였습니다.</span>
              </p>
              <div className="hidden lg:block">
                <p>
                  00동아리에서 부장으로 활동하며 회의록 작성 및 문서 관리
                  과정에서 팀원 간 소통의 어려움이 있었습니다.
                </p>
                <p className="mt-1">
                  이에 따라 내용 요약 및 불필요한 부분 정리를 통해 회의록 작성의{" "}
                  <span className="bg-gray-200">효율성을 개선하였습니다.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={ref}
          className={`w-full flex items-center flex-col transition-all duration-300 delay-500
            ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <img
            src={BigArrow}
            alt="화살표"
            className="w-30 absolute -top-36 z-10"
          />
          <div className="w-full flex justify-center">
            <div className="relative w-full  flex justify-center">
              <div
                className={cn(
                  "flex justify-center absolute left-5 rounded-full bg-[#0D326F] border-[1px] border-[#C1D9FF] text-white",
                  "w-[62px] py-[8px] text-[14px] -top-[15%]",
                  "lg:w-[107px] lg:py-[15px] lg:text-xl lg:font-semibold lg:-top-[20%]",
                )}
              >
                수정 후
              </div>
              <div className="rounded-md border w-full border-[#C1D9FF] shadow-[0_0_14.3px_0_rgba(193,217,255,0.70)] bg-white pb-[19px] px-[42px] pt-[46px] text-[14px] lg:text-[20px] font-normal leading-relaxed">
                <p className="lg:hidden">
                  00동아리 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서
                  팀원 간 소통의 어려움을 인식했습니다. 000를 활용한{" "}
                  <span className="bg-[#C1D9FF]/70">
                    실시간 협업 시스템 도입
                  </span>
                  과, 핵심 내용 요약 및 불필요한 부분 정리를 통해 회의록 작성의{" "}
                  <span className="bg-[#C1D9FF]/70">약 20% 이상 개선</span>
                  하였습니다.
                </p>
                <div className="hidden lg:block">
                  <p>
                    00동아리 부장으로 활동하며, 회의록 작성 및 문서 관리
                    과정에서 팀원 간 소통의 어려움을 인식했습니다.
                  </p>
                  <p>
                    000를 활용한 
                    <span className="bg-[#C1D9FF]/70">
                      실시간 협업 시스템 도입
                    </span>
                    과, 핵심 내용 요약 및 불필요한 부분 정리를 통해{" "}
                  </p>
                  <p>
                    회의록 작성의 효율성을{" "}
                    <span className="bg-[#C1D9FF]/70">약 20% 이상 개선</span>
                    하였습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExplainSectionLayout>
  );
}
