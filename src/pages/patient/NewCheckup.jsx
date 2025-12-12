import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runMockTriage } from '../../data/mockData';
import { FaThermometerHalf, FaHeartbeat, FaLungs } from 'react-icons/fa';
import './NewCheckup.css';

const NewCheckup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        symptoms: [],
        customSymptom: '',
        vitals: { temp: '', hr: '', spo2: '' },
        photos: [],
        audioRecorded: false
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
        
        navigate('/dashboard/patient/checkup/results', { 
            state: { triageResult: result, symptoms: allSymptoms, vitals: formData.vitals } 
        });
    };

    return (
        <div className="new-checkup">
            <div className="checkup-header">
                <h1>New Health Checkup</h1>
                <div className="step-indicator">
                    <span className={step >= 1 ? 'active' : ''}>1. Symptoms</span>
                    <span className={step >= 2 ? 'active' : ''}>2. Vitals</span>
                    <span className={step >= 3 ? 'active' : ''}>3. Media</span>
                </div>
            </div>

            {step === 1 && (
                <div className="form-section">
                    <h2>Select Your Symptoms</h2>
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
                    <button className="next-btn" onClick={() => setStep(2)} disabled={formData.symptoms.length === 0}>
                        Next: Enter Vitals
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="form-section">
                    <h2>Enter Your Vitals</h2>
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
                        <button className="back-btn" onClick={() => setStep(1)}>Back</button>
                        <button className="next-btn" onClick={() => setStep(3)}>Next: Add Media</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="form-section">
                    <h2>Add Photos or Audio (Optional)</h2>
                    <div className="media-section">
                        <div className="upload-box">
                            <p>📷 Upload Photos</p>
                            <input type="file" accept="image/*" multiple />
                        </div>
                        <div className="upload-box">
                            <p>🎤 Record Cough Audio</p>
                            <button className="record-btn">Start Recording</button>
                        </div>
                    </div>
                    <div className="button-group">
                        <button className="back-btn" onClick={() => setStep(2)}>Back</button>
                        <button className="triage-btn" onClick={handleRunTriage}>
                            🤖 Run AI Triage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewCheckup;
