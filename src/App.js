import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Header from "./shared/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 로그인 전 페이지 */}
        <Route exact path="/" element={<Landing />} />

        {/* 로그인 후 페이지 */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
