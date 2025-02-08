import React, { useState } from "react";
import styles from "./Header.module.scss";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      window.location.href = "https://zackinthebox.shop/oauth2/authorization/google";
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Logo</div>
        <button className={styles.menu} onClick={handleAuth}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
}

export default Header;
