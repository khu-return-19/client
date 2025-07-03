import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "shared/header";
import Landing from "pages/landing";
import Analysis from "pages/analysis";
import Intro from "pages/intro";
import Evaluation3D from "pages/evaluation3D";
import Team from "pages/team";
import Analyze from "pages/analyze";
import Notice from "pages/notice";
import Footer from "shared/footer";
import PrivacyPolicy from "pages/privacy-policy";
import NoticeDetail from "pages/notice-detail";
import NotFound from "pages/Error/notFound";

function AppContent() {
  const location = useLocation();

  const noFooterPages = ["/error"];
  const isNoFooterPage = noFooterPages.includes(location.pathname) || location.pathname.startsWith("/analysis");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* 서비스 소개 */}
        <Route path="intro" element={<Intro />} />
        <Route path="evaluation" element={<Evaluation3D />} />
        <Route path="team" element={<Team />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />

        <Route path="/analysis" element={<Analysis />} />
        <Route path="/analyze" element={<Analyze />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isNoFooterPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
