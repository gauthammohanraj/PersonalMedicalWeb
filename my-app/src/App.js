import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotSureWhoToSee from "./pages/NotSureWhoToSee";
import NewlyDiagnosed from "./pages/NewlyDiagnosed";
import EHRSummary from "./components/EHRSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/not-sure-who-to-see" element={<NotSureWhoToSee />} />
      <Route path="/newly-diagnosed" element={<NewlyDiagnosed />} />
      <Route path="/ehr-summary" element={<EHRSummary />} />
    </Routes>
  );
}

export default App;
