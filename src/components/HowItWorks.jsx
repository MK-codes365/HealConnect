import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works-section">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <div className="timeline">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <h3>Record Symptoms</h3>
                        <p>User uploads photo/audio and enters symptoms.</p>
                    </div>
                    <div className="arrow-container">
                        <FaArrowRight className="timeline-arrow" />
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <h3>AI Triage</h3>
                        <p>System predicts urgency: Low / Medium / High.</p>
                    </div>
                    <div className="arrow-container">
                        <FaArrowRight className="timeline-arrow" />
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <h3>Doctor Consult</h3>
                        <p>Doctor reviews case and starts video consult.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
