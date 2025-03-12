import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "auth/authContext";
import Landing from "./pages/landing";
import Header from "./shared/header";
import Profile from "pages/profile";
import Resume from "pages/resume";
import Analysis from "pages/analysis";
import AnalysisDetail from "pages/analysis-detail";
import ResumeSelect from "./pages/analysis-select";
import PrivateRoute from "./privateRoute";
import { LoginError } from "pages/Error";
import { ToastContainer } from "react-toastify";
import Intro from "pages/intro";
import AboutLayout from "shared/aboutLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/about" element={<AboutLayout />}>
            <Route index element={<Navigate to="intro" replace />} />
            <Route path="intro" element={<Intro />} />
            {/* <Route path="evaluation" element={<Evaluation />} />
            <Route path="team" element={<Team />} /> */}
          </Route>

          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/resume" element={<PrivateRoute element={<Resume />} />} />
          <Route path="/analysis" element={<PrivateRoute element={<Analysis />} />} />
          <Route path="/analysis/:id" element={<PrivateRoute element={<AnalysisDetail />} />} />
          <Route path="/analysis/select" element={<PrivateRoute element={<ResumeSelect />} />} />
          <Route path="/error" element={<LoginError />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
