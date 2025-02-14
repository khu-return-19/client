import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Header from "./shared/header";
import Profile from "pages/profile";
import Resume from "pages/profile-resume";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:resumeId" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
