import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "auth/authContext";
import Landing from "./pages/landing";
import Header from "./shared/header";
import Profile from "./pages/profile";
import Resume from "./pages/resume";
import Analysis from "./pages/analysis";
import PrivateRoute from "./privateRoute";
import { LoginError } from "pages/Error";
import { ToastContainer } from "react-toastify";
import Intro from "./pages/intro";
import AboutLayout from "./shared/aboutLayout";
import Evaluation3D from "./pages/evaluation3D";
import Team from "./pages/team";
import Analyze from "./pages/analyze";
import Notice from "./pages/notice";
import Footer from "./shared/footer";
import PrivacyPolicy from "pages/privacy-policy";
import Write from "pages/notice/write";

function AppContent() {
  const location = useLocation();

  const noFooterPages = ["/analyze", "/error"];
  const isNoFooterPage = noFooterPages.includes(location.pathname) || location.pathname.startsWith("/analysis");

  return (
    <>
      <Header />
      <Routes>
        {/* 서비스 소개 */}
        <Route path="/about" element={<AboutLayout />}>
          <Route index element={<Navigate to="intro" replace />} />
          <Route path="intro" element={<Intro />} />
          <Route path="evaluation" element={<Evaluation3D />} />
          <Route path="team" element={<Team />} />
        </Route>
        <Route path="/notice" element={<Notice />} />

        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/resume" element={<PrivateRoute element={<Resume />} />} />

        <Route path="/analysis" element={<PrivateRoute element={<Analysis />} />} />
        <Route path="/analysis/:id" element={<PrivateRoute element={<Analysis />} />} />

        <Route path="/error" element={<LoginError />} />
        <Route path="/analyze" element={<PrivateRoute element={<Analyze />} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/notice/write" element={<Write />} />
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
