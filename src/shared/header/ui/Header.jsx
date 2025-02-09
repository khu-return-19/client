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
        <a href="/" className={styles.logoLink}>
          <img className={styles.logo} src="/logo.png" alt="로고" />
        </a>
        <button className={styles.loginButton} onClick={handleAuth}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
}

export default Header;
