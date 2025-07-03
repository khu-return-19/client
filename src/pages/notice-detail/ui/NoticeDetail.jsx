import React from "react";
import styles from "./NoticeDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchNotice } from "api/noticeApi";
import { NoticeDetailSkeleton } from "layouts/notice-detail";

function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: notice, isLoading } = useFetchNotice(id);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    // UTC 시간에서 한국 시간(KST)으로 변환 (9시간 추가)
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    // 날짜 형식 지정 (YYYY.MM.DD)
    return koreaTime
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  const handleClick = () => {
    navigate("/notice");
    window.scrollTo(0, 0);
  };

  if (isLoading) return <NoticeDetailSkeleton />;

  return (
    <div className={styles.noticeDetail}>
      <div className={styles.wrapper}>
        <div className={styles.notice}>공지사항</div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>{notice.title}</div>
            <div className={styles.dateAndMenu}>
              <div className={styles.date}>{formatDate(notice.modifiedAt)}</div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
        </div>
      </div>
      <div className={styles.listButton} onClick={handleClick}>
        목록으로
      </div>
    </div>
  );
}

export default NoticeDetail;
