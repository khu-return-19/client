import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { SESSION_STORAGE_KEY } from "api/sessionApi";
import { AUTH_EXPIRED_EVENT, clearClientAuthState } from "api/authRecovery";
import ReactGA from "react-ga4";
import Auth from "pages/input-page/auth/Auth";
import Company from "pages/input-page/company/Company";
import Resume from "pages/input-page/resume/Resume";
import SelfIntroduction from "pages/input-page/self-introduction/SelfIntroduction";
import Loading from "pages/input-page/loading/Loading";
import AnalysisPage from "pages/analysis-page/AnalysisPage";
import LandingPage from "pages/landing-page/LandingPage";
import NoticeList from "pages/notice-page/list/NoticeList";
import NoticeDetail from "pages/notice-page/detail/NoticeDetail";
import ServiceIntroduction from "pages/service-introduction/ServiceIntroduction";

function SessionRoute({ element }) {
  return !!sessionStorage.getItem(SESSION_STORAGE_KEY) ? element : <Navigate to="/input-page/auth" replace />;
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location.pathname]);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearClientAuthState();
      if (location.pathname !== "/input-page/auth") {
        navigate("/input-page/auth", { replace: true });
      }
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, [location.pathname, navigate]);

  return (
    <>
        <Routes>
        {/* 랜딩 페이지 */}
        <Route path="*" element={<LandingPage />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />

        {/* 서비스 소개 */}
        <Route path="/service-introduction" element={<ServiceIntroduction />} />

        {/* 입력 페이지 */}
        <Route path="/input-page/auth" element={<Auth />} />
        <Route path="/input-page/company" element={<SessionRoute element={<Company />} />} />
        <Route path="/input-page/resume" element={<SessionRoute element={<Resume />} />} />
        <Route path="/input-page/self-introduction" element={<SessionRoute element={<SelfIntroduction />} />} />
        <Route path="/input-page/loading" element={<SessionRoute element={<Loading />} />} />

        {/* 분석 페이지 */}
        <Route path="/analysis" element={<SessionRoute element={<AnalysisPage />} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
