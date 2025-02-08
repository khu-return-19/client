import React from "react";
import styles from "./Card.module.scss";

function Card({ title, date, content }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>{title}</span>
        <span>{date}</span>
      </div>
      <div className={styles.conent}>{content}</div>
    </div>
  );
}

export default Card;
