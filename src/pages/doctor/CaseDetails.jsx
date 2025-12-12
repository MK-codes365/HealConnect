import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCases, workerCases } from '../../data/mockData';
import { FaUser, FaThermometerHalf, FaHeartbeat, FaLungs, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaSave, FaPaperPlane } from 'react-icons/fa';
import './CaseDetails.css';

const CaseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Find case in combined data
    const allCases = [...mockCases, ...workerCases];
    const caseData = allCases.find(c => c.id === parseInt(id));

    const [notes, setNotes] = useState(caseData?.doctorNotes || '');
    const [prescription, setPrescription] = useState(caseData?.prescription || '');
    const [isSaving, setIsSaving] = useState(false);

    if (!caseData) {
        return (
            <div className="case-details-page">
                <h1>Case Not Found</h1>
                <button onClick={() => navigate('/dashboard/doctor')} className="back-btn">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const getUrgencyConfig = () => {
        switch (caseData.urgency) {
            case 'HIGH':
                return { icon: FaExclamationTriangle, color: '#ef4444', label: 'High Priority' };
            case 'MEDIUM':
                return { icon: FaInfoCircle, color: '#f59e0b', label: 'Medium Priority' };
            default:
                return { icon: FaCheckCircle, color: '#14b8a6', label: 'Low Priority' };
        }
    };

    const urgencyConfig = getUrgencyConfig();

    const handleSaveDraft = () => {
        setIsSaving(true);
        setTimeout(() => {
            alert('Draft saved! Case status updated to "Under Review"');
            setIsSaving(false);
        }, 500);
    };

    const handleSubmitReview = () => {
        if (!notes.trim()) {
            alert('Please add doctor notes before submitting');
            return;
        }
        setIsSaving(true);
        setTimeout(() => {
            alert(`Review submitted for ${caseData.patientName}! Patient will be notified.`);
            navigate('/dashboard/doctor');
        }, 500);
    };

    return (
        <div className="case-details-page">
            <div className="page-header">
                <div>
                    <h1>Case Review</h1>
                    <p className="case-id">Case #{caseData.id} - {caseData.specialty}</p>
                </div>
                <div className="urgency-badge-header" style={{ background: urgencyConfig.color }}>
                    <urgencyConfig.icon /> {urgencyConfig.label}
                </div>
            </div>

            <div className="case-content">
                {/* Patient Information */}
                <div className="section patient-info-section">
                    <h2><FaUser /> Patient Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Name:</span>
                            <span className="value">{caseData.patientName}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Age:</span>
                            <span className="value">{caseData.age} years</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Village:</span>
                            <span className="value">{caseData.village || 'Not specified'}</span>
                        </div>
                        {caseData.contact && (
                            <div className="info-item">
                                <span className="label">Contact:</span>
                                <span className="value">{caseData.contact}</span>
                            </div>
                        )}
                        <div className="info-item">
                            <span className="label">Submitted:</span>
                            <span className="value">{caseData.submittedAt.toLocaleString()}</span>
                        </div>
                        {caseData.submittedBy && (
                            <div className="info-item">
                                <span className="label">Submitted By:</span>
                                <span className="value">{caseData.submittedBy}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Symptoms & Vitals */}
                <div className="section symptoms-vitals-section">
                    <div className="symptoms-col">
                        <h2>Symptoms Reported</h2>
                        <div className="symptoms-list">
                            {caseData.symptoms.map((symptom, idx) => (
                                <span key={idx} className="symptom-tag">{symptom}</span>
                            ))}
                        </div>
                    </div>
                    <div className="vitals-col">
                        <h2>Vitals</h2>
                        <div className="vitals-display">
                            <div className="vital-item">
                                <FaThermometerHalf className="vital-icon" />
                                <span className="vital-label">Temperature</span>
                                <span className="vital-value">{caseData.vitals.temp}°F</span>
                            </div>
                            <div className="vital-item">
                                <FaHeartbeat className="vital-icon" />
                                <span className="vital-label">Heart Rate</span>
                                <span className="vital-value">{caseData.vitals.hr} bpm</span>
                            </div>
                            <div className="vital-item">
                                <FaLungs className="vital-icon" />
                                <span className="vital-label">SpO₂</span>
                                <span className="vital-value">{caseData.vitals.spo2}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Triage Analysis */}
                <div className="section ai-triage-section">
                    <h2>🤖 AI Triage Analysis</h2>
                    <div className="ai-analysis">
                        <div className="analysis-item">
                            <strong>Urgency Level:</strong>
                            <span style={{ color: urgencyConfig.color }}>{caseData.urgency}</span>
                        </div>
                        <div className="analysis-item">
                            <strong>Recommended Specialty:</strong>
                            <span>{caseData.specialty}</span>
                        </div>
                        <div className="analysis-item">
                            <strong>AI Reasoning:</strong>
                            <p>{caseData.reason}</p>
                        </div>
                    </div>
                </div>

                {/* Doctor Notes */}
                <div className="section notes-section">
                    <h2>Doctor's Notes</h2>
                    <textarea
                        className="notes-textarea"
                        placeholder="Enter your medical observations, diagnosis, and recommendations..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={6}
                    />
                </div>

                {/* Prescription */}
                <div className="section prescription-section">
                    <h2>Prescription</h2>
                    <textarea
                        className="prescription-textarea"
                        placeholder="Enter prescription details (medications, dosage, duration)..."
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        rows={6}
                    />
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button onClick={() => navigate('/dashboard/doctor')} className="back-btn">
                        Back to Queue
                    </button>
                    <button onClick={handleSaveDraft} className="save-draft-btn" disabled={isSaving}>
                        <FaSave /> Save Draft
                    </button>
                    <button onClick={handleSubmitReview} className="submit-btn" disabled={isSaving}>
                        <FaPaperPlane /> Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CaseDetails;
