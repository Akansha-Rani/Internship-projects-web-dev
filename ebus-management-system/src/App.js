import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BusProvider } from "./context/BusContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BusProvider>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ flex: 1, background: "#f2f6ff", minHeight: "100vh", padding: "2rem" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<LiveMap />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BusProvider>
  );
}

export default App;
