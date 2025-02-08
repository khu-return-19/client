import React from "react";
import styles from "./ReviewHistory.module.scss";
import { Title, Card } from "components/dashboard/reviewHistory";

function ReviewHistory() {
  // 더미 데이터
  const dummyReviews = [
    { title: "첫 번째 리뷰", date: "2024.02.07", content: "첫 번째 리뷰 내용입니다." },
    { title: "두 번째 리뷰", date: "2024.02.06", content: "두 번째 리뷰 내용입니다." },
    { title: "세 번째 리뷰", date: "2024.02.05", content: "세 번째 리뷰 내용입니다." },
  ];

  return (
    <div className={styles.reviewHistory}>
      <div className={styles.reviewHistoryInner}>
        <Title />
        <div className={styles.content}>
          {dummyReviews.map((review, index) => (
            <Card key={index} title={review.title} date={review.date} content={review.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewHistory;
