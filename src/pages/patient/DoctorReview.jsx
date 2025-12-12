import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCases } from '../../data/mockData';
import { FaUserMd, FaFilePrescription, FaNotesMedical, FaDownload, FaCalendar } from 'react-icons/fa';
import './DoctorReview.css';

const DoctorReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const caseData = mockCases.find(c => c.id === parseInt(id));

    if (!caseData) {
        return (
            <div className="doctor-review-page">
                <h1>Case Not Found</h1>
                <button onClick={() => navigate('/dashboard/patient')} className="back-btn">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const handleDownloadPrescription = () => {
        alert('Prescription downloaded successfully!');
    };

    return (
        <div className="doctor-review-page">
            <div className="review-header">
                <div>
                    <h1>Doctor's Review</h1>
                    <p className="case-ref">Case #{caseData.id} - {caseData.specialty}</p>
                </div>
                <div className="urgency-badge" style={{ 
                    background: caseData.urgency === 'HIGH' ? '#ef4444' : 
                               caseData.urgency === 'MEDIUM' ? '#f59e0b' : '#14b8a6' 
                }}>
                    {caseData.urgency} Priority
                </div>
            </div>

            <div className="review-section doctor-info">
                <div className="section-header">
                    <FaUserMd className="section-icon" />
                    <h2>Reviewed By</h2>
                </div>
                <div className="doctor-card">
                    <div className="doctor-avatar">👨‍⚕️</div>
                    <div>
                        <h3>{caseData.doctorName}</h3>
                        <p className="specialty">{caseData.specialty} Specialist</p>
                        {caseData.reviewedAt && (
                            <p className="review-time">
                                <FaCalendar /> Reviewed on {caseData.reviewedAt.toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="review-section">
                <div className="section-header">
                    <FaNotesMedical className="section-icon" />
                    <h2>Doctor's Notes</h2>
                </div>
                <div className="notes-content">
                    {caseData.doctorNotes || 'No notes available yet. The doctor is still reviewing your case.'}
                </div>
            </div>

            <div className="review-section prescription-section">
                <div className="section-header">
                    <FaFilePrescription className="section-icon" />
                    <h2>Prescription</h2>
                </div>
                {caseData.prescription ? (
                    <>
                        <div className="prescription-content">
                            {caseData.prescription.split('\n').map((line, idx) => (
                                <div key={idx} className="prescription-line">
                                    <span className="bullet">💊</span>
                                    <span>{line}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleDownloadPrescription} className="download-btn">
                            <FaDownload /> Download Prescription
                        </button>
                    </>
                ) : (
                    <div className="empty-prescription">
                        <p>No prescription issued yet.</p>
                    </div>
                )}
            </div>

            <div className="review-section">
                <div className="section-header">
                    <h2>Your Submitted Information</h2>
                </div>
                <div className="submitted-info">
                    <div className="info-row">
                        <strong>Symptoms:</strong>
                        <span>{caseData.symptoms.join(', ')}</span>
                    </div>
                    <div className="info-row">
                        <strong>Vitals:</strong>
                        <span>
                            Temp: {caseData.vitals.temp}°F | 
                            HR: {caseData.vitals.hr} bpm | 
                            SpO₂: {caseData.vitals.spo2}%
                        </span>
                    </div>
                    <div className="info-row">
                        <strong>Submitted:</strong>
                        <span>{caseData.submittedAt.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button onClick={() => navigate('/dashboard/patient')} className="back-btn">
                    Back to Dashboard
                </button>
                <button onClick={() => navigate('/dashboard/patient/checkup/new')} className="new-checkup-btn">
                    Start New Checkup
                </button>
            </div>
        </div>
    );
};

export default DoctorReview;
