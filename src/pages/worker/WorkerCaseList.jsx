import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workerCases, getStatusConfig } from '../../data/mockData';
import { FaSearch, FaDownload } from 'react-icons/fa';
import './WorkerCaseList.css';

const WorkerCaseList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredCases = workerCases.filter(c => {
        const matchesSearch = searchQuery === '' || 
            c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.village.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getUrgencyColor = (urgency) => {
        return urgency === 'HIGH' ? '#ef4444' : urgency === 'MEDIUM' ? '#f59e0b' : '#14b8a6';
    };

    return (
        <div className="worker-case-list">
            <div className="list-header">
                <h1>Submitted Cases</h1>
                <p className="subtitle">Track all patient cases you've registered</p>
            </div>

            <div className="search-filter-bar">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by patient name or village..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <div className="cases-table">
                {filteredCases.length === 0 ? (
                    <div className="empty-state">
                        <p style={{ fontSize: '3rem' }}>📋</p>
                        <h3>No cases found</h3>
                        <p>Register a new patient to get started</p>
                    </div>
                ) : (
                    filteredCases.map(caseItem => {
                        const statusConfig = getStatusConfig(caseItem.status);
                        return (
                            <div key={caseItem.id} className="case-row">
                                <div className="case-main-info">
                                    <h3>{caseItem.patientName}</h3>
                                    <p>{caseItem.age} years • {caseItem.village}</p>
                                </div>
                                <div className="case-details">
                                    <div className="detail-item">
                                        <span className="label">Symptoms:</span>
                                        <span>{caseItem.symptoms.join(', ')}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Urgency:</span>
                                        <span className="urgency-badge" style={{ background: getUrgencyColor(caseItem.urgency) }}>
                                            {caseItem.urgency}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Doctor:</span>
                                        <span>{caseItem.doctorAssigned}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Status:</span>
                                        <span className="status-badge" style={{ background: statusConfig.color }}>
                                            {statusConfig.icon} {statusConfig.label}
                                        </span>
                                    </div>
                                </div>
                                {caseItem.prescription && (
                                    <button className="download-prescription-btn">
                                        <FaDownload /> Download Prescription
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            <button onClick={() => navigate('/dashboard/worker')} className="back-btn">
                Back to Dashboard
            </button>
        </div>
    );
};

export default WorkerCaseList;
