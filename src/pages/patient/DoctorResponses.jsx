import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorResponses = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ padding: '2rem', color: 'white', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Doctor Responses</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                Track your active cases and view doctor responses
            </p>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '3rem', borderRadius: '16px' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</p>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '2rem' }}>
                    View the status of your submitted cases and doctor reviews
                </p>
                <button onClick={() => navigate('/dashboard/patient/status')} style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    border: 'none',
                    color: 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '1.1rem'
                }}>
                    View Case Status
                </button>
            </div>
            <button onClick={() => navigate('/dashboard/patient')} style={{
                marginTop: '2rem',
                padding: '1rem 2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid #475569',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer'
            }}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default DoctorResponses;
