import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "pages/input-page/auth/Auth";
import Company from "pages/input-page/company/Company";
import Resume from "pages/input-page/resume/Resume";
import SelfIntroduction from "pages/input-page/self-introduction/SelfIntroduction";
import Loading from "pages/input-page/loading/Loading";
import ReportPage from "pages/report/ReportPage";

function AppContent() {
  return (
    <>
      {/* Header */}

      <Routes>
        {/* 입력 페이지 */}
        <Route path="/input-page/auth" element={<Auth />} />
        <Route path="/input-page/company" element={<Company />} />
        <Route path="/input-page/resume" element={<Resume />} />
        <Route path="/input-page/self-introduction" element={<SelfIntroduction />} />
        <Route path="/input-page/loading" element={<Loading />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>

      {/* Footer */}
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
