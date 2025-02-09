import React from "react";
import styles from "./ReviewHistory.module.scss";
import { Title, Card } from "components/dashboard/reviewHistory";

function ReviewHistory() {
  // 더미 데이터
  const dummyReviews = [
    { title: "첫 번째 리뷰", date: "2024.02.07", content: "첫 번째 리뷰 내용입니다." },
    { title: "두 번째 리뷰", date: "2024.02.06", content: "두 번째 리뷰 내용입니다." },
    { title: "세 번째 리뷰", date: "2024.02.05", content: "세 번째 리뷰 내용입니다." },
    { title: "네 번째 리뷰", date: "2024.02.04", content: "네 번째 리뷰 내용입니다." },
    { title: "다섯 번째 리뷰", date: "2024.02.03", content: "다섯 번째 리뷰 내용입니다." },
    { title: "여섯 번째 리뷰", date: "2024.02.02", content: "여섯 번째 리뷰 내용입니다." },
    { title: "일곱 번째 리뷰", date: "2024.02.01", content: "일곱 번째 리뷰 내용입니다." },
    { title: "여덟 번째 리뷰", date: "2024.01.31", content: "여덟 번째 리뷰 내용입니다." },
    { title: "아홉 번째 리뷰", date: "2024.01.30", content: "아홉 번째 리뷰 내용입니다." },
    { title: "열 번째 리뷰", date: "2024.01.29", content: "열 번째 리뷰 내용입니다." },
    { title: "열한 번째 리뷰", date: "2024.01.28", content: "열한 번째 리뷰 내용입니다." },
    { title: "열두 번째 리뷰", date: "2024.01.27", content: "열두 번째 리뷰 내용입니다." },
    { title: "열세 번째 리뷰", date: "2024.01.26", content: "열세 번째 리뷰 내용입니다." },
    { title: "열네 번째 리뷰", date: "2024.01.25", content: "열네 번째 리뷰 내용입니다." },
    { title: "열다섯 번째 리뷰", date: "2024.01.24", content: "열다섯 번째 리뷰 내용입니다." },
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
