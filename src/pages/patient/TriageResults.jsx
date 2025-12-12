import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaDownload, FaPaperPlane } from 'react-icons/fa';
import './TriageResults.css';

const TriageResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { triageResult, symptoms, vitals } = location.state || {};

    if (!triageResult) {
        navigate('/dashboard/patient');
        return null;
    }

    const getUrgencyConfig = () => {
        switch (triageResult.urgency) {
            case 'HIGH':
                return { icon: FaExclamationTriangle, color: '#ef4444', label: 'High Priority' };
            case 'MEDIUM':
                return { icon: FaInfoCircle, color: '#f59e0b', label: 'Medium Priority' };
            default:
                return { icon: FaCheckCircle, color: '#14b8a6', label: 'Low Priority' };
        }
    };

    const urgencyConfig = getUrgencyConfig();

    const handleSendToDoctor = () => {
        alert('Case sent to doctor! You will be notified when a doctor reviews your case.');
        navigate('/dashboard/patient');
    };

    const handleDownload = () => {
        alert('Report downloaded successfully!');
    };

    return (
        <div className="triage-results">
            <div className="results-header">
                <h1>AI Triage Results</h1>
                <p>Analysis completed based on your symptoms and vitals</p>
            </div>

            <div className="urgency-card" style={{ borderColor: urgencyConfig.color }}>
                <urgencyConfig.icon className="urgency-icon" style={{ color: urgencyConfig.color }} />
                <h2 style={{ color: urgencyConfig.color }}>{urgencyConfig.label}</h2>
                <div className="specialty-badge">{triageResult.specialty}</div>
            </div>

            <div className="results-section">
                <h3>Analysis</h3>
                <p className="reason-text">{triageResult.reason}</p>
            </div>

            <div className="results-section">
                <h3>Your Symptoms</h3>
                <div className="symptoms-list">
                    {symptoms.map((symptom, idx) => (
                        <span key={idx} className="symptom-tag">{symptom}</span>
                    ))}
                </div>
            </div>

            <div className="results-section">
                <h3>Vitals Recorded</h3>
                <div className="vitals-display">
                    <div className="vital-item">
                        <span className="vital-label">Temperature</span>
                        <span className="vital-value">{vitals.temp || '98.6'}°F</span>
                    </div>
                    <div className="vital-item">
                        <span className="vital-label">Heart Rate</span>
                        <span className="vital-value">{vitals.hr || '75'} bpm</span>
                    </div>
                    <div className="vital-item">
                        <span className="vital-label">SpO₂</span>
                        <span className="vital-value">{vitals.spo2 || '98'}%</span>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="download-btn" onClick={handleDownload}>
                    <FaDownload /> Download Report
                </button>
                <button className="send-btn" onClick={handleSendToDoctor}>
                    <FaPaperPlane /> Send to Doctor
                </button>
            </div>
        </div>
    );
};

export default TriageResults;
