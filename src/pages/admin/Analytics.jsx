import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAnalytics } from '../../data/mockData';
import { FaChartLine, FaUsers, FaClock } from 'react-icons/fa';
import './Analytics.css';

const Analytics = () => {
    const navigate = useNavigate();

    return (
        <div className="analytics-page">
            <div className="page-header">
                <h1>Analytics Dashboard</h1>
                <p className="subtitle">System statistics and insights</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaChartLine className="stat-icon" />
                    <div className="stat-content">
                        <h3>{mockAnalytics.totalCases}</h3>
                        <p>Total Cases</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div className="stat-content">
                        <h3>{mockAnalytics.activeUsers}</h3>
                        <p>Active Users</p>
                    </div>
                </div>
                <div className="stat-card">
                    <FaClock className="stat-icon" />
                    <div className="stat-content">
                        <h3>{mockAnalytics.avgResponseTime}</h3>
                        <p>Avg Response Time</p>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <h2>Cases by Urgency</h2>
                    <div className="chart-bars">
                        <div className="bar-item">
                            <div className="bar-label">High</div>
                            <div className="bar-container">
                                <div className="bar high" style={{ width: `${(mockAnalytics.casesByUrgency.HIGH / mockAnalytics.totalCases) * 100}%` }}>
                                    {mockAnalytics.casesByUrgency.HIGH}
                                </div>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">Medium</div>
                            <div className="bar-container">
                                <div className="bar medium" style={{ width: `${(mockAnalytics.casesByUrgency.MEDIUM / mockAnalytics.totalCases) * 100}%` }}>
                                    {mockAnalytics.casesByUrgency.MEDIUM}
                                </div>
                            </div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">Low</div>
                            <div className="bar-container">
                                <div className="bar low" style={{ width: `${(mockAnalytics.casesByUrgency.LOW / mockAnalytics.totalCases) * 100}%` }}>
                                    {mockAnalytics.casesByUrgency.LOW}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chart-card">
                    <h2>Cases by Specialty</h2>
                    <div className="chart-bars">
                        {Object.entries(mockAnalytics.casesBySpecialty).map(([specialty, count]) => (
                            <div key={specialty} className="bar-item">
                                <div className="bar-label">{specialty}</div>
                                <div className="bar-container">
                                    <div className="bar specialty" style={{ width: `${(count / mockAnalytics.totalCases) * 100}%` }}>
                                        {count}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button onClick={() => navigate('/dashboard/admin')} className="back-btn">
                Back to Dashboard
            </button>
        </div>
    );
};

export default Analytics;
