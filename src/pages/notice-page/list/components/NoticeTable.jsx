import AngleLeftIcon from "../../../../assets/icons/AngleLeft.svg"
import AngleRightIcon from "../../../../assets/icons/AngleRight.svg"
import NoticeListItem from "./NoticeListItem";

const PAGES_PER_GROUP = 5;

function NoticeTable({ notices, filterType, searchText, currentPage, pageSize, onPageChange }) {
    if (!notices) return null;

    console.log(notices);

    const allNotices = notices.data?.notices ?? [];
    const totalItems = notices.data?.total ?? 0;

    // 클라이언트 사이드 필터 (서버가 필터를 지원하지 않는 경우 대비)
    const filteredNotices = allNotices.filter(notice => {
        let typeMatch = true;
        if (filterType === '중요') typeMatch = notice.type === 1;
        // if (filterType === '일반') typeMatch = notice.type === 2;
        if (filterType === '일반') typeMatch = true;

        let searchMatch = true;
        if (searchText) {
            searchMatch = notice.title.toLowerCase().includes(searchText.trim().toLowerCase());
        }

        return typeMatch && searchMatch;
    });

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
    const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handlePrevGroup = () => {
        if (startPage > 1) {
            onPageChange(startPage - PAGES_PER_GROUP);
        }
    };

    const handleNextGroup = () => {
        if (endPage < totalPages) {
            onPageChange(startPage + PAGES_PER_GROUP);
        }
    };

    return (
        <div>
            <div className="w-full h-[500px] flex flex-col gap-[10px]">
                {filteredNotices.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-['Pretendard'] font-normal text-[16px] leading-[150%] text-[#717171]">
                            등록된 공지사항이 없습니다.
                        </span>
                    </div>
                ) : (
                    filteredNotices.map((notice) => (
                        <NoticeListItem key={notice.id} notice={notice} />
                    ))
                )}
            </div>
            {filteredNotices.length > 0 && (
                <div className="w-full flex justify-center mt-[40px] mb-[100px]">
                    <div className="w-[288px] flex justify-between items-center">
                        <img src={AngleLeftIcon} alt="left" className="w-[24px] h-[24px] cursor-pointer" onClick={handlePrevGroup} />
                        <div className="flex items-center gap-[5px]">
                            {pageNumbers.map((num) => (
                                <div 
                                    key={num} 
                                    onClick={() => onPageChange(num)}
                                    className="flex justify-center items-center w-[24px] h-[24px] cursor-pointer"
                                >
                                    {currentPage === num ? (
                                        <span className="font-['Pretendard'] font-[600] text-[16px] text-[#09469F]">{num}</span>
                                    ) : (
                                        <span className="font-['Pretendard'] font-[400] text-[16px] text-[#717171]">{num}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <img src={AngleRightIcon} alt="right" className="w-[24px] h-[24px] cursor-pointer" onClick={handleNextGroup} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default NoticeTable;