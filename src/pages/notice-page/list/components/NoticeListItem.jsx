import { useNavigate } from "react-router-dom";
import formatDate from "../../../../utils/formatDate";
import AngleRightIcon from "../../../../assets/icons/AngleRight.svg"
import NoticeBadge from "../../components/NoticeBadge";

function NoticeListItem({ notice }) {
    const navigate = useNavigate();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const isNew = new Date(notice.modifiedAt) >= oneWeekAgo;

    return (
        <div 
            className="w-full h-[40px] flex items-center justify-between px-[8px] box-border cursor-pointer"
            onClick={() => navigate(`/notice/${notice.id}`)}
        >
            <div className="flex items-center">
                <NoticeBadge type={2} /> {/* TODO: 공지사항 타입 추가시 변경 */}
                <p className="font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[15px] text-[#121212]">{notice.title}</p>
                {isNew && <span className="ml-[24px] text-[#2876F1] font-[Pretendard] font-[400] text-[14px] max-[768px]:hidden">NEW</span>}
            </div>
            <div className="flex items-center gap-[40px] max-[768px]:gap-[10px]">
                <span className="max-[768px]:hidden font-['Pretendard'] font-[400] text-[16px] text-[#717171]">{formatDate(notice.modifiedAt)}</span>
                <span className="min-[769px]:hidden ml-[24px] text-[#2876F1] font-[Pretendard] font-[400] text-[14px]">NEW</span>
                <img src={AngleRightIcon} alt="right" className="w-[24px] h-[24px]" />
            </div>
        </div>
    );
}

export default NoticeListItem;
