import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCases, getStatusConfig } from '../../data/mockData';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import './CaseStatus.css';

const CaseStatus = () => {
    const navigate = useNavigate();
    const patientCases = mockCases.filter(c => c.status !== 'closed');

    const getTimeAgo = (date) => {
        const minutes = Math.floor((Date.now() - date) / 60000);
        if (minutes < 60) return `${minutes} min ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="case-status-page">
            <div className="page-header">
                <h1>My Active Cases</h1>
                <p className="subtitle">Track the status of your submitted checkups</p>
            </div>

            {patientCases.length === 0 ? (
                <div className="empty-state">
                    <p style={{ fontSize: '3rem' }}>📋</p>
                    <h3>No Active Cases</h3>
                    <p>You don't have any pending cases. Start a new checkup to get started!</p>
                    <button onClick={() => navigate('/dashboard/patient/checkup/new')} className="primary-btn">
                        Start New Checkup
                    </button>
                </div>
            ) : (
                <div className="cases-list">
                    {patientCases.map(caseItem => {
                        const statusConfig = getStatusConfig(caseItem.status);
                        return (
                            <div key={caseItem.id} className="case-card">
                                <div className="case-header">
                                    <div className="case-id">Case #{caseItem.id}</div>
                                    <div className="case-time">
                                        <FaClock /> {getTimeAgo(caseItem.submittedAt)}
                                    </div>
                                </div>

                                <div className="case-body">
                                    <div className="urgency-badge" style={{ background: 
                                        caseItem.urgency === 'HIGH' ? '#ef4444' : 
                                        caseItem.urgency === 'MEDIUM' ? '#f59e0b' : '#14b8a6' 
                                    }}>
                                        {caseItem.urgency} Priority
                                    </div>
                                    <div className="specialty-tag">{caseItem.specialty}</div>
                                </div>

                                <div className="symptoms-preview">
                                    <strong>Symptoms:</strong> {caseItem.symptoms.join(', ')}
                                </div>

                                <div className="status-tracker">
                                    <div className="status-step">
                                        <div className={`step-circle ${statusConfig.step >= 1 ? 'active' : ''}`}>
                                            {statusConfig.step >= 1 ? <FaCheckCircle /> : '1'}
                                        </div>
                                        <span>Submitted</span>
                                    </div>
                                    <div className="status-line"></div>
                                    <div className="status-step">
                                        <div className={`step-circle ${statusConfig.step >= 2 ? 'active' : ''}`}>
                                            {statusConfig.step >= 2 ? <FaCheckCircle /> : '2'}
                                        </div>
                                        <span>Under Review</span>
                                    </div>
                                    <div className="status-line"></div>
                                    <div className="status-step">
                                        <div className={`step-circle ${statusConfig.step >= 3 ? 'active' : ''}`}>
                                            {statusConfig.step >= 3 ? <FaCheckCircle /> : '3'}
                                        </div>
                                        <span>Reviewed</span>
                                    </div>
                                </div>

                                <div className="case-footer">
                                    <div className="status-badge" style={{ background: statusConfig.color }}>
                                        {statusConfig.icon} {statusConfig.label}
                                    </div>
                                    {caseItem.status === 'reviewed' && (
                                        <button 
                                            onClick={() => navigate(`/dashboard/patient/case/${caseItem.id}`)}
                                            className="view-btn"
                                        >
                                            View Doctor's Response
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <button onClick={() => navigate('/dashboard/patient')} className="back-btn">
                Back to Dashboard
            </button>
        </div>
    );
};

export default CaseStatus;
