import Header from "components/Header/Header";
import CancelIcon from "assets/icons/취소.svg";
import { useNavigate } from "react-router-dom";

function LoadingPageLayout({ children }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen overflow-y-auto">
            <Header />
            <div className="w-full flex flex-col items-center pt-[clamp(52px,calc(2.5vw+28px),64px)] px-[20px]">
                <div className="w-full max-w-[1200px] max-[893px]:max-w-[452px] mb-[80px] max-[768px]:mb-[40px] h-[24px] min-[894px]:mt-[40px] max-[893px]:mt-[20px] max-[768px]:mt-[16px]">
                    <button className="flex h-full items-center gap-1 outline-none background-none" onClick={() => navigate("/input-page/self-introduction")}>
                        <img src={CancelIcon} alt="취소하기" />
                        <span className="text-[#717171] font-[500] text-[16px]">취소하기</span>
                    </button>
                </div>
                <div className="w-full max-w-[468px] max-[893px]:max-w-[267px]">
                    <h2 className="text-[#000000] font-[500] text-[42px] leading-[140%] mb-[12px] max-[893px]:text-[24px] max-[893px]:leading-[120%] max-[893px]:mb-[7px]">
                        자기소개서를 분석 중입니다.
                        <br />
                        잠시만 기다려 주세요!
                    </h2>
                    <p className="text-[#717171] font-[400] text-[20px] mb-[80px] leading-[160%] max-[893px]:mb-[40px]">
                        최대 3분정도 소요됩니다.
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LoadingPageLayout;