import { useState } from "react";
import { useFetchNotices } from "api/noticeApi";
import NoticePageLayout from "../layouts/NoticePageLayout";
import NoticeListLayout from "./layouts/NoticeListLayout";
import NoticeTable from "./components/NoticeTable";

const PAGE_SIZE = 10;

function NoticeList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState('전체');
    const [searchText, setSearchText] = useState("");

    const { data: notices, isLoading, isError } = useFetchNotices(currentPage, PAGE_SIZE);

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1); // 필터 변경 시 1페이지로 리셋
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        setCurrentPage(1); // 검색 변경 시 1페이지로 리셋
    };

    if (isLoading) return <div>로딩중...</div>;
    if (isError) return <div>에러 발생</div>;

    return (
        <NoticePageLayout>
            <NoticeListLayout 
                filterType={filterType} 
                onSelectFilter={handleFilterChange}
                searchText={searchText}
                onSearchChange={handleSearchChange}
            >
                <NoticeTable
                    notices={notices}
                    filterType={filterType}
                    searchText={searchText}
                    currentPage={currentPage}
                    pageSize={PAGE_SIZE}
                    onPageChange={setCurrentPage}
                />
            </NoticeListLayout>
        </NoticePageLayout>
    );
}

export default NoticeList;