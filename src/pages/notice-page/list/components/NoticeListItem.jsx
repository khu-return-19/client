import { useNavigate } from "react-router-dom";
import AngleRightIcon from "../../../../assets/icons/AngleRight.svg"
import NoticeBadge from "../../components/NoticeBadge";

function NoticeListItem({ notice }) {
    const navigate = useNavigate();

    return (
        <div 
            className="w-full h-[40px] flex items-center justify-between px-[8px] box-border cursor-pointer"
            onClick={() => navigate(`/notice/${notice.id}`)}
        >
            <div className="flex items-center">
                <NoticeBadge type={notice.type} />
                <p className="font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[15px] text-[#121212]">{notice.title}</p>
                {notice.isNew && <span className="ml-[24px] text-[#2876F1] font-[Pretendard] font-[400] text-[14px] max-[768px]:hidden">NEW</span>}
            </div>
            <div className="flex items-center gap-[40px] max-[768px]:gap-[10px]">
                <span className="max-[768px]:hidden font-['Pretendard'] font-[400] text-[16px] text-[#717171]">{notice.date}</span>
                <span className="min-[769px]:hidden ml-[24px] text-[#2876F1] font-[Pretendard] font-[400] text-[14px]">NEW</span>
                <img src={AngleRightIcon} alt="right" className="w-[24px] h-[24px]" />
            </div>
        </div>
    );
}

export default NoticeListItem;
