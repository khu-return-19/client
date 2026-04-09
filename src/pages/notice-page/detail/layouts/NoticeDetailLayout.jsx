import { useNavigate } from "react-router-dom";
import AngleLeftIcon from "../../../../assets/icons/AngleLeft.svg"
import FileIcon from "../../../../assets/icons/File.svg"
import NoticeBadge from "../../components/NoticeBadge";
import formatDate from "utils/formatDate";

function NoticeDetailLayout({ notice }) {
    const navigate = useNavigate();
    
    return (
        <div className="w-full min-[769px]:max-w-[1000px] min-[769px]:px-[40px] min-[769px]:pt-[80px] max-[768px]:px-[20px] max-[768px]:max-w-[728px] max-[768px]:pt-[18px] mb-[200px]">
            <button className="outline-none border-none cursor-pointer bg-transparent" onClick={() => navigate(-1)}>
                <img src={AngleLeftIcon} alt="left" className="w-[32px] h-[32px]" />
            </button>
            <div className="flex items-center mt-[40px] mb-[16px] max-[768px]:mt-[24px] max-[768px]:mb-[20px]">
                <NoticeBadge type={2} /> {/* TODO: 공지사항 타입 추가시 변경 */}
                <span className="font-['Pretendard'] font-[400] text-[14px] max-[768px]:text-[12px] text-[#717171]">{formatDate(notice.modifiedAt)}</span>
            </div>
            <h1 className="w-full pb-[16px] border-b-[1px] border-[#AEB4BC] font-['Pretendard'] font-[600] text-[20px] max-[768px]:text-[16px] text-[#121212] leading-[140%] tracking-[-1%] mb-[72px] max-[768px]:mb-[30px]">{notice.title}</h1>
            <p className="font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[14px] text-[#121212] leading-[150%] whitespace-pre-line mb-[68px] max-[768px]:px-[10px] box-border">{notice.content}</p>

            {/* TODO: 공지시항 api response에 파일 추가시 변경 */}
            {false && <div className="flex items-center pl-[13px] max-[768px]:pl-[12px] gap-[10px] h-[60px] max-[768px]:h-[40px] box-border border-b border-t border-[#AEB4BC] mt-[12px] mb-[60px]"> 
                <img src={FileIcon} alt="file" className="w-[24px] h-[24px]" />
                <button className="outline-none border-none cursor-pointer bg-transparent font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[14px] text-[#121212] leading-[150%] tracking-[-1%] underline" onClick={() => window.open(notice.fileURL, '_blank')}>{notice.fileName}</button>
            </div>}

            <div className="flex w-full min-[769px]:justify-end max-[768px]:justify-center">
                <button className="outline-none border-none cursor-pointer bg-transparent" onClick={() => navigate(-1)}>
                    <div className="w-[120px] h-[44px] flex justify-center items-center border border-[#0D326F] rounded-[6px]">
                        <span className="font-[500] text-[16px] text-[#0D326F] leading-[150%]">목록</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default NoticeDetailLayout;
