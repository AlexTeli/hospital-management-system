import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MakeAppointment from './pages/MakeAppointment';
import DoctorSchedule from './pages/DoctorSchedule';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Billing from './pages/Billing';
import Notifications from './pages/Notifications';
import CompleteProfile from './pages/CompleteProfile';
import DoctorHistory from './pages/DoctorHistory';
import PatientMedicalHistory from './pages/PatientMedicalHistory';

function App() {
  return (
      <Router>
        <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
          <Navbar />
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/programare" element={<MakeAppointment />} />
              <Route path="/doctor-schedule" element={<DoctorSchedule />} />
              <Route path="/facturi" element={<Billing />} />
              <Route path="/dashboard" element={<AnalyticsDashboard />} />
              <Route path="/notificari" element={<Notifications />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/doctor-history" element={<DoctorHistory />} />
              <Route path="/istoric-medical" element={<PatientMedicalHistory />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;