import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeDashboardPage from "./components/pages/HomeDashboard";
import OrganizationSettings from "./components/pages/OrganisationSettings";
import Notes from "./components/pages/notesPage";
import Activities from "./components/pages/ActivityPage";
import FieldManagement from "./components/pages/FieldsPage";

const Routing: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboardPage />} />
        <Route path="/settings" element={<OrganizationSettings />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/fields" element={<FieldManagement />} />
        <Route path="/activity" element={<Activities />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
};

export default Routing;
