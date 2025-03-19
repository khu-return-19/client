import React, { useState, useEffect, useRef, use } from "react";
import styles from "./NoticeDetail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchNotice, useDeleteNotice } from "api/noticeApi";
import { useAuth } from "auth/authContext";
import { AiOutlineMore } from "react-icons/ai";

function NoticeDetail() {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: notice, isLoading, error } = useFetchNotice(id);
  const { mutate: deleteNotice } = useDeleteNotice();

  const { userInfo } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) && // 드롭다운 바깥 클릭
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // 버튼 바깥 클릭
      ) {
        setMenuOpen(null);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>공지사항을 불러오는 중 오류가 발생했습니다.</div>;
  if (!notice) return <div>공지사항이 존재하지 않습니다.</div>;

  const handleMenuToggle = (event, id) => {
    event.stopPropagation();
    setMenuOpen((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    console.log("수정:", id);
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();
    deleteNotice(id, {
      onSuccess: () => {
        alert("공지사항이 삭제되었습니다.");
        navigate("/notice");
        window.scrollTo(0, 0);
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      },
    });
  };

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
            <div className={styles.dateAndMenu}>
              <div className={styles.date}>{formatDate(notice.modifiedAt)}</div>
              {userInfo?.role === "admin" && (
                <div className={styles.menuContainer}>
                  <div
                    className={styles.menuButton}
                    onClick={(event) => handleMenuToggle(event, notice.id)}
                    ref={buttonRef}
                  >
                    <AiOutlineMore />
                  </div>
                  {menuOpen === notice.id && (
                    <div className={styles.menuDropdown} ref={menuRef}>
                      <div onClick={(event) => handleEdit(event, notice.id)}>수정</div>
                      <div onClick={(event) => handleDelete(event, notice.id)} className={styles.delete}>
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
