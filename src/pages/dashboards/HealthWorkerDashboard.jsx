import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserPlus, FaClipboardList, FaComments, FaCloudUploadAlt } from 'react-icons/fa';
import './HealthWorkerDashboard.css';

const HealthWorkerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const tiles = [
        { icon: FaUserPlus, title: 'Register New Patient', desc: 'Add new patient case with symptoms and vitals', path: '/dashboard/worker/register', color: '#14b8a6' },
        { icon: FaClipboardList, title: 'View Cases Submitted', desc: 'Track all registered patient cases', path: '/dashboard/worker/cases', color: '#3b82f6' },
        { icon: FaComments, title: 'Doctor Responses', desc: 'Check doctor reviews and prescriptions', path: '/dashboard/worker/responses', color: '#8b5cf6' },
        { icon: FaCloudUploadAlt, title: 'Offline Uploads', desc: 'Sync cases saved offline', path: '/dashboard/worker/offline', color: '#f59e0b' }
    ];

    return (
        <div className="worker-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Welcome, {user?.name}</h1>
                    <p className="subtitle">Health Worker Dashboard</p>
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

export default HealthWorkerDashboard;
