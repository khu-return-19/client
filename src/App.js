import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Header from "./shared/header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Header />
      <Routes>
        {/* 로그인 전 페이지 */}
        <Route exact path="/" element={!isLoggedIn ? <Landing /> : <Dashboard />} />

        {/* 로그인 후 페이지 */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
