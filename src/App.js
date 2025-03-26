import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "auth/authContext";
import Landing from "./pages/landing";
import Header from "./shared/header";
import Resume from "./pages/resume";
import Analysis from "./pages/analysis";
import PrivateRoute from "./privateRoute";
import LoginError from "pages/Error/login";
import { ToastContainer } from "react-toastify";
import Intro from "./pages/intro";
import AboutLayout from "./shared/aboutLayout";
import Evaluation3D from "./pages/evaluation3D";
import Team from "./pages/team";
import Analyze from "./pages/analyze";
import Notice from "./pages/notice";
import Footer from "./shared/footer";
import PrivacyPolicy from "pages/privacy-policy";
import WriteNotice from "pages/notice-write";
import NoticeDetail from "pages/notice-detail";
import EditNotice from "pages/notice-edit";
import NotFound from "pages/Error/notFound";

function AppContent() {
  const location = useLocation();

  const noFooterPages = ["/resume", "/error"];
  const isNoFooterPage = noFooterPages.includes(location.pathname) || location.pathname.startsWith("/analysis");

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* 서비스 소개 */}
        <Route path="/about" element={<AboutLayout />}>
          <Route index element={<Navigate to="intro" replace />} />
          <Route path="intro" element={<Intro />} />
          <Route path="evaluation" element={<Evaluation3D />} />
          <Route path="team" element={<Team />} />
        </Route>

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

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/error" element={<LoginError />} />
        <Route path="*" element={<NotFound />} />
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
