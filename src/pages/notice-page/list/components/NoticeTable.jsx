import { useState, useEffect } from "react";
import AngleLeftIcon from "../../../../assets/icons/AngleLeft.svg"
import AngleRightIcon from "../../../../assets/icons/AngleRight.svg"
import NoticeListItem from "./NoticeListItem";

const noticeList = [
    {
        type: 1,
        id: 1,
        title: '서비스 점검 안내',
        isNew: true,
        date: '2026-03-24',
    },
    {
        type: 1,
        id: 2,
        title: '개인정보 처리방침/이용약관 개정 사전 안내',
        isNew: true,
        date: '2026-03-24',
    },
    {
        type: 2,
        id: 3,
        title: '자기소개서 분석 리포트 생성 기준 업데이트 안내',
        isNew: true,
        date: '2026-03-24',
    },
    {
        type: 2,
        id: 4,
        title: '서비스 런칭 안내 및 베타 운영 정책',
        isNew: true,
        date: '2026-03-24',
    },
    {
        type: 2,
        id: 5,
        title: '첨부파일 업로드 형식 및 용량 제한 변경 안내',
        isNew: true,
        date: '2026-03-24',
    }
]

function NoticeTable({ filterType, searchText }) {
    const [currentPage, setCurrentPage] = useState(1);
    
    // 필터 로직 처리
    const filteredNotices = noticeList.filter(notice => {
        let typeMatch = true;
        if (filterType === '중요') typeMatch = notice.type === 1;
        if (filterType === '일반') typeMatch = notice.type === 2;
        
        let searchMatch = true;
        if (searchText) {
            searchMatch = notice.title.toLowerCase().includes(searchText.trim().toLowerCase());
        }

        return typeMatch && searchMatch;
    });

    const totalItems = filteredNotices.length;
    const ITEMS_PER_PAGE = 10;
    const PAGES_PER_GROUP = 5;

    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
    const displayedNotices = filteredNotices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // 필터 조건 변경 시 항상 1페이지로 리셋
    useEffect(() => {
        setCurrentPage(1);
    }, [filterType, searchText]);

    const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
    const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handlePrevGroup = () => {
        if (startPage > 1) {
            setCurrentPage(startPage - PAGES_PER_GROUP);
        }
    };

    const handleNextGroup = () => {
        if (endPage < totalPages) {
            setCurrentPage(startPage + PAGES_PER_GROUP);
        }
    };

    return (
        <div>
            <div className="w-full h-[500px] flex flex-col gap-[10px]">
                {displayedNotices.map((notice) => (
                    <NoticeListItem key={notice.id} notice={notice} />
                ))}
            </div>
            <div className="w-full flex justify-center mt-[40px] mb-[100px]">
                <div className="w-[288px] flex justify-between items-center">
                    <img src={AngleLeftIcon} alt="left" className="w-[24px] h-[24px] cursor-pointer" onClick={handlePrevGroup} />
                    <div className="flex items-center gap-[5px]">
                        {pageNumbers.map((num) => (
                            <div 
                                key={num} 
                                onClick={() => setCurrentPage(num)}
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
        </div>
    );
}

export default NoticeTable;