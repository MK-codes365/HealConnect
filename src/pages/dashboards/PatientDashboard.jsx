import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaClipboardList, FaFileAlt, FaComments, FaVideo } from 'react-icons/fa';
import './PatientDashboard.css';

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const tiles = [
        { icon: FaClipboardList, title: 'Start New Checkup', desc: 'Submit symptoms and get AI triage', path: '/dashboard/patient/checkup/new', color: '#14b8a6' },
        { icon: FaFileAlt, title: 'My Previous Reports', desc: 'View your medical history', path: '/dashboard/patient/reports', color: '#3b82f6' },
        { icon: FaComments, title: 'Doctor Responses', desc: 'Check doctor notes and prescriptions', path: '/dashboard/patient/responses', color: '#8b5cf6' },
        { icon: FaVideo, title: 'Video Consultations', desc: 'Upcoming and past consultations', path: '/dashboard/patient/consultations', color: '#f59e0b' }
    ];

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user?.name}</h1>
                    <p className="subtitle">Patient Dashboard</p>
                </div>
                <button onClick={logout} className="logout-btn">Logout</button>
            </div>
            
            <div className="tiles-grid">
                {tiles.map((tile, idx) => (
                    <div key={idx} className="dashboard-tile" onClick={() => navigate(tile.path)} style={{ borderColor: tile.color }}>
                        <tile.icon className="tile-icon" style={{ color: tile.color }} />
                        <h3>{tile.title}</h3>
                        <p>{tile.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientDashboard;
