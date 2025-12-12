import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runMockTriage, addToOfflineQueue } from '../../data/mockData';
import { FaUser, FaThermometerHalf, FaHeartbeat, FaLungs, FaWifi, FaBan } from 'react-icons/fa';
import './RegisterPatient.css';

const RegisterPatient = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        village: '',
        contact: '',
        symptoms: [],
        customSymptom: '',
        vitals: { temp: '', hr: '', spo2: '' }
    });

    const commonSymptoms = [
        'Fever', 'Cough', 'Headache', 'Fatigue', 'Chest pain',
        'Shortness of breath', 'Nausea', 'Dizziness', 'Body ache'
    ];

    const toggleSymptom = (symptom) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom]
        }));
    };

    const handleVitalChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            vitals: { ...prev.vitals, [field]: value }
        }));
    };

    const handleRunTriage = () => {
        const allSymptoms = [...formData.symptoms];
        if (formData.customSymptom) allSymptoms.push(formData.customSymptom);
        
        const result = runMockTriage(allSymptoms, {
            temp: parseFloat(formData.vitals.temp) || 98.6,
            hr: parseInt(formData.vitals.hr) || 75,
            spo2: parseInt(formData.vitals.spo2) || 98
        });
        
        navigate('/dashboard/worker/triage', { 
            state: { 
                triageResult: result, 
                patientData: formData,
                symptoms: allSymptoms, 
                vitals: formData.vitals 
            } 
        });
    };

    const handleSaveOffline = () => {
        const caseData = {
            ...formData,
            symptoms: [...formData.symptoms, formData.customSymptom].filter(Boolean),
            submittedBy: "Worker (Offline)"
        };
        addToOfflineQueue(caseData);
        alert('Case saved offline! You can sync it later when online.');
        navigate('/dashboard/worker');
    };

    return (
        <div className="register-patient">
            <div className="online-status">
                {isOnline ? (
                    <span className="status-online"><FaWifi /> Online</span>
                ) : (
                    <span className="status-offline"><FaBan /> Offline</span>
                )}
            </div>

            <div className="register-header">
                <h1>Register New Patient</h1>
                <div className="step-indicator">
                    <span className={step >= 1 ? 'active' : ''}>1. Patient Info</span>
                    <span className={step >= 2 ? 'active' : ''}>2. Symptoms</span>
                    <span className={step >= 3 ? 'active' : ''}>3. Vitals</span>
                </div>
            </div>

            {step === 1 && (
                <div className="form-section">
                    <h2><FaUser /> Patient Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Patient Name *</label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={formData.patientName}
                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Age *</label>
                            <input
                                type="number"
                                placeholder="Age"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Village/Location *</label>
                            <input
                                type="text"
                                placeholder="Village name"
                                value={formData.village}
                                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="tel"
                                placeholder="Optional"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            />
                        </div>
                    </div>
                    <button 
                        className="next-btn" 
                        onClick={() => setStep(2)}
                        disabled={!formData.patientName || !formData.age || !formData.village}
                    >
                        Next: Enter Symptoms
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="form-section">
                    <h2>Select Patient's Symptoms</h2>
                    <div className="symptoms-grid">
                        {commonSymptoms.map(symptom => (
                            <button
                                key={symptom}
                                className={`symptom-btn ${formData.symptoms.includes(symptom) ? 'selected' : ''}`}
                                onClick={() => toggleSymptom(symptom)}
                            >
                                {symptom}
                            </button>
                        ))}
                    </div>
                    <div className="custom-symptom">
                        <label>Other Symptoms:</label>
                        <input
                            type="text"
                            placeholder="Describe any other symptoms..."
                            value={formData.customSymptom}
                            onChange={(e) => setFormData({ ...formData, customSymptom: e.target.value })}
                        />
                    </div>
                    <div className="button-group">
                        <button className="back-btn" onClick={() => setStep(1)}>Back</button>
                        <button className="next-btn" onClick={() => setStep(3)} disabled={formData.symptoms.length === 0}>
                            Next: Enter Vitals
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="form-section">
                    <h2>Enter Patient's Vitals</h2>
                    <div className="vitals-grid">
                        <div className="vital-input">
                            <FaThermometerHalf className="vital-icon" />
                            <label>Temperature (°F)</label>
                            <input
                                type="number"
                                step="0.1"
                                placeholder="98.6"
                                value={formData.vitals.temp}
                                onChange={(e) => handleVitalChange('temp', e.target.value)}
                            />
                        </div>
                        <div className="vital-input">
                            <FaHeartbeat className="vital-icon" />
                            <label>Heart Rate (bpm)</label>
                            <input
                                type="number"
                                placeholder="75"
                                value={formData.vitals.hr}
                                onChange={(e) => handleVitalChange('hr', e.target.value)}
                            />
                        </div>
                        <div className="vital-input">
                            <FaLungs className="vital-icon" />
                            <label>SpO₂ (%)</label>
                            <input
                                type="number"
                                placeholder="98"
                                value={formData.vitals.spo2}
                                onChange={(e) => handleVitalChange('spo2', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="back-btn" onClick={() => setStep(2)}>Back</button>
                        {!isOnline && (
                            <button className="offline-btn" onClick={handleSaveOffline}>
                                💾 Save Offline
                            </button>
                        )}
                        <button className="triage-btn" onClick={handleRunTriage}>
                            🤖 Run AI Triage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterPatient;
