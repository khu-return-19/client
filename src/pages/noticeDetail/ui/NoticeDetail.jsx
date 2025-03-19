import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchNotice } from "api/noticeApi";
import styles from "./NoticeDetail.module.scss";

function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: notice, isLoading, error } = useFetchNotice(id);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>공지사항을 불러오는 중 오류가 발생했습니다.</div>;
  if (!notice) return <div>공지사항이 존재하지 않습니다.</div>;

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

  return (
    <div className={styles.noticeDetail}>
      <div className={styles.wrapper}>
        <div className={styles.notice}>공지사항</div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>{notice.title}</div>
            <div className={styles.date}>{formatDate(notice.modifiedAt)}</div>
          </div>
          <div className={styles.body}>{notice.content}</div>
        </div>
      </div>
      <div className={styles.listButton} onClick={handleClick}>
        목록
      </div>
    </div>
  );
}

export default NoticeDetail;
