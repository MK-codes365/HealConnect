import React from 'react';
import { useNavigate } from 'react-router-dom';

const Consultations = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ padding: '2rem', color: 'white', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Video Consultations</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                No upcoming consultations scheduled
            </p>
            <div style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '3rem', borderRadius: '16px' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📹</p>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
                    When a doctor schedules a video consultation, it will appear here.
                </p>
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

export default Consultations;
