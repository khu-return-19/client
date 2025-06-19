import React, { useState } from "react";
import styles from "./Notification.module.scss";
import { AiOutlineBell, AiOutlineClose } from "react-icons/ai";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.notification} ${isOpen ? styles.open : styles.collapsed}`}>
      {isOpen ? (
        <>
          <div className={styles.messageWrapper}>
            <span>
              이 페이지를 벗어나면 분석 보고서는
              <br /> 저장되지 않습니다.
            </span>
            <span>
              분석이 완료되면 보고서는 <br />
              이메일로 자동 전송됩니다.
            </span>
          </div>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </button>
        </>
      ) : (
        <button className={styles.iconButton} onClick={() => setIsOpen(true)}>
          <AiOutlineBell />
        </button>
      )}
    </div>
  );
}

export default Notification;
