import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDashboardPage from "./components/pages/HomeDashboard";
import OrganizationSettings from "./components/pages/OrganisationSettings";
import Notes from "./components/pages/notesPage";

const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboardPage props={undefined} />} />
        <Route path="/settings" element={<OrganizationSettings />} />
        <Route path="/notes" element={<Notes />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default Routing;
