import { useState } from "react";
import NoticePageLayout from "../layouts/NoticePageLayout";
import NoticeListLayout from "./layouts/NoticeListLayout";
import NoticeTable from "./components/NoticeTable";

function NoticeList() {
    const [filterType, setFilterType] = useState('전체');
    const [searchText, setSearchText] = useState("");

    return (
        <NoticePageLayout>
            <NoticeListLayout 
                filterType={filterType} 
                onSelectFilter={setFilterType}
                searchText={searchText}
                onSearchChange={setSearchText}
            >
                <NoticeTable filterType={filterType} searchText={searchText} />
            </NoticeListLayout>
        </NoticePageLayout>
    );
}

export default NoticeList;