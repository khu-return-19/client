import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "auth/authContext";
import Landing from "./pages/landing";
import Header from "./shared/header";
import Profile from "pages/profile";
import Resume from "pages/profile-resume";
import Analysis from "pages/analysis";
import AnalysisDetail from "pages/analysis-detail";
import ResumeSelect from "./pages/analysis-select";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Resume />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/:id" element={<AnalysisDetail />} />
          <Route path="/analysis/select" element={<ResumeSelect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
