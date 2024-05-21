import React from "react";
import { Routes, Route } from "react-router-dom";
import OrganizationSettings from "./components/pages/OrganisationSettings";
import Notes from "./components/pages/notesPage";
import Activities from "./components/pages/ActivityPage";
import FieldManagement from "./components/pages/FieldsPage";
import FarmManagement from "./components/pages/FarmPage";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FarmManagement />} />
      <Route path="/settings" element={<OrganizationSettings />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/fields" element={<FieldManagement />} />
      <Route path="/activity" element={<Activities />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default Routing;
