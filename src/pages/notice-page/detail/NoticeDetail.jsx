import { useParams } from "react-router-dom";
import { useFetchNotice } from "../../../api/noticeApi";
import NoticePageLayout from "../layouts/NoticePageLayout";
import NoticeDetailLayout from "./layouts/NoticeDetailLayout";

function NoticeDetail() {
    const { id } = useParams();
    const { data: notice, isLoading, isError, error } = useFetchNotice(id);
    const isNotFound = error?.response.data.code === "NOTICE_NOT_FOUND";

    if (isLoading) {
        return (
            <NoticePageLayout>
                <div className="w-full flex justify-center items-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #E5E7EB',
                        borderTop: '3px solid #09469F',
                        borderRadius: '50%',
                        animation: 'notice-spin 0.8s linear infinite',
                    }} />
                    <style>{`
                        @keyframes notice-spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </NoticePageLayout>
        );
    }

    if (isError) {
        return (
            <NoticePageLayout>
                <div className="w-full flex flex-col justify-center items-center gap-[12px]" style={{ minHeight: 'calc(100vh - 64px)' }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="22" stroke="#D1D5DB" strokeWidth="2" />
                        <path d="M24 15v11" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" />
                        <circle cx="24" cy="32" r="1.5" fill="#9CA3AF" />
                    </svg>
                    <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '16px', fontWeight: 500, color: '#374151' }}>
                        {isNotFound ? '존재하지 않는 공지사항입니다.' : '공지사항을 불러오는 중 문제가 발생했습니다.'}
                    </p>
                    <p style={{ fontFamily: 'Pretendard, sans-serif', fontSize: '14px', fontWeight: 400, color: '#9CA3AF' }}>
                        {isNotFound ? '삭제되었거나 잘못된 링크일 수 있습니다.' : '잠시 후 다시 시도해 주세요.'}
                    </p>
                </div>
            </NoticePageLayout>
        );
    }

    return (
        <NoticePageLayout>
            <NoticeDetailLayout notice={notice.data} />
        </NoticePageLayout>
    );
}

export default NoticeDetail;