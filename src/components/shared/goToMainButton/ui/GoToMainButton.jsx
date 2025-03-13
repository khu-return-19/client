import React from "react";
import styles from "./GoToMainButton.module.scss";
import { useNavigate } from "react-router-dom";

function GoToMainButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.goToMainButton} onClick={handleClick}>
      메인 화면으로
    </div>
  );
}

export default GoToMainButton;
