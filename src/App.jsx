import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import HealthWorkerDashboard from './pages/dashboards/HealthWorkerDashboard';

import NewCheckup from './pages/patient/NewCheckup';
import TriageResults from './pages/patient/TriageResults';
import MedicalHistory from './pages/patient/Reports';
import DoctorResponses from './pages/patient/DoctorResponses';
import Consultations from './pages/patient/Consultations';
import CaseStatus from './pages/patient/CaseStatus';
import DoctorReview from './pages/patient/DoctorReview';

import RegisterPatient from './pages/worker/RegisterPatient';
import PatientTriageResults from './pages/worker/PatientTriageResults';
import WorkerCaseList from './pages/worker/WorkerCaseList';

import CaseDetails from './pages/doctor/CaseDetails';

import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/patient/checkup/new" element={<NewCheckup />} />
          <Route path="/dashboard/patient/checkup/results" element={<TriageResults />} />
          <Route path="/dashboard/patient/reports" element={<MedicalHistory />} />
          <Route path="/dashboard/patient/responses" element={<DoctorResponses />} />
          <Route path="/dashboard/patient/consultations" element={<Consultations />} />
          <Route path="/dashboard/patient/status" element={<CaseStatus />} />
          <Route path="/dashboard/patient/case/:id" element={<DoctorReview />} />
          
          <Route path="/dashboard/worker" element={<HealthWorkerDashboard />} />
          <Route path="/dashboard/worker/register" element={<RegisterPatient />} />
          <Route path="/dashboard/worker/triage" element={<PatientTriageResults />} />
          <Route path="/dashboard/worker/cases" element={<WorkerCaseList />} />
          
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/dashboard/doctor/case/:id" element={<CaseDetails />} />
          
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<UserManagement />} />
          <Route path="/dashboard/admin/analytics" element={<Analytics />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
