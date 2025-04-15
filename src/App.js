import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "auth/authContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./privateRoute";
import Header from "shared/header";
import Landing from "pages/landing";
import Resume from "pages/resume";
import Analysis from "pages/analysis";
import LoginError from "pages/Error/login";
import Intro from "pages/intro";
import Evaluation3D from "pages/evaluation3D";
import Team from "pages/team";
import Analyze from "pages/analyze";
import Notice from "pages/notice";
import Footer from "shared/footer";
import PrivacyPolicy from "pages/privacy-policy";
import WriteNotice from "pages/notice-write";
import NoticeDetail from "pages/notice-detail";
import EditNotice from "pages/notice-edit";
import NotFound from "pages/Error/notFound";
import Terms from "pages/terms";
import UniversityEmailOnly from "pages/Error/university-email-only";

function AppContent() {
  const location = useLocation();

  const noHeaderPages = ["/terms"];
  const noFooterPages = ["/resume", "/error"];
  const isNoHeaderPage = noHeaderPages.includes(location.pathname);
  const isNoFooterPage = noFooterPages.includes(location.pathname) || location.pathname.startsWith("/analysis");

  return (
    <>
      {!isNoHeaderPage && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* 서비스 소개 */}
        <Route path="intro" element={<Intro />} />
        <Route path="evaluation" element={<Evaluation3D />} />
        <Route path="team" element={<Team />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/notice/write" element={<WriteNotice />} />
        <Route path="/notice/:id/edit" element={<EditNotice />} />

        <Route element={<PrivateRoute />}>
          <Route path="/resume" element={<Resume />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:id" element={<Analysis />} />
          <Route path="/analyze" element={<Analyze />} />
        </Route>

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/error" element={<LoginError />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/university-email-only" element={<UniversityEmailOnly />} />
      </Routes>

      {!isNoFooterPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  );
}

export default App;
