import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inspection from "pages/inspection";

// ===== 점검으로 인한 주석처리 =====
// import { useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import Header from "shared/header";
// import Landing from "pages/landing";
// import Analysis from "pages/analysis";
// import Intro from "pages/intro";
// import Evaluation3D from "pages/evaluation3D";
// import Team from "pages/team";
// import Analyze from "pages/analyze";
// import Notice from "pages/notice";
// import Footer from "shared/footer";
// import PrivacyPolicy from "pages/privacy-policy";
// import NoticeDetail from "pages/notice-detail";
// import NotFound from "pages/Error/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Inspection />} />
      </Routes>
    </Router>
  );
}

export default App;
