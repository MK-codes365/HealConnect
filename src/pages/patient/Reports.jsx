import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPatientHistory } from '../../data/mockData';
import { FaCalendar, FaFilter, FaDownload, FaSearch, FaTimes } from 'react-icons/fa';
import './MedicalHistory.css';

const MedicalHistory = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [urgencyFilter, setUrgencyFilter] = useState('all');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    
    const specialties = [...new Set(mockPatientHistory.map(h => h.specialty))];
    const statuses = [...new Set(mockPatientHistory.map(h => h.status))];

    const filterByDate = (record) => {
        if (dateRange === 'all') return true;
        const now = new Date();
        const recordDate = record.date;
        const daysDiff = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24));
        
        switch(dateRange) {
            case 'week': return daysDiff <= 7;
            case 'month': return daysDiff <= 30;
            case '3months': return daysDiff <= 90;
            default: return true;
        }
    };

    const filteredHistory = mockPatientHistory.filter(record => {
        const matchesSearch = searchQuery === '' || 
            record.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesUrgency = urgencyFilter === 'all' || record.urgency === urgencyFilter;
        const matchesSpecialty = specialtyFilter === 'all' || record.specialty === specialtyFilter;
        const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchesDate = filterByDate(record);
        
        return matchesSearch && matchesUrgency && matchesSpecialty && matchesStatus && matchesDate;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setUrgencyFilter('all');
        setSpecialtyFilter('all');
        setStatusFilter('all');
        setDateRange('all');
    };

    const getUrgencyColor = (urgency) => {
        return urgency === 'HIGH' ? '#ef4444' : urgency === 'MEDIUM' ? '#f59e0b' : '#14b8a6';
    };

    const activeFiltersCount = [urgencyFilter, specialtyFilter, statusFilter, dateRange].filter(f => f !== 'all').length;

    return (
        <div className="medical-history-page">
            <div className="history-header">
                <div>
                    <h1>Medical History Timeline</h1>
                    <p className="subtitle">Track your health journey over time</p>
                </div>
                <button onClick={() => alert('Full history exported!')} className="export-btn">
                    <FaDownload /> Export History
                </button>
            </div>

            <div className="search-filter-section">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by symptoms, doctor, or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <FaTimes className="clear-icon" onClick={() => setSearchQuery('')} />
                    )}
                </div>
                
                <button 
                    className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FaFilter /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
            </div>

            {showFilters && (
                <div className="advanced-filters">
                    <div className="filter-group">
                        <label>Urgency</label>
                        <select value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
                            <option value="all">All Urgency Levels</option>
                            <option value="HIGH">High Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="LOW">Low Priority</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Specialty</label>
                        <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)}>
                            <option value="all">All Specialties</option>
                            {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Statuses</option>
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date Range</label>
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="all">All Time</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="3months">Last 3 Months</option>
                        </select>
                    </div>

                    <button className="clear-filters-btn" onClick={clearFilters}>
                        <FaTimes /> Clear All
                    </button>
                </div>
            )}

            <div className="results-summary">
                Showing {filteredHistory.length} of {mockPatientHistory.length} cases
            </div>

            {filteredHistory.length === 0 ? (
                <div className="no-results">
                    <p style={{ fontSize: '3rem' }}>🔍</p>
                    <h3>No cases found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="timeline">
                    {filteredHistory.map((record, idx) => (
                        <div key={record.id} className="timeline-item">
                            <div className="timeline-marker" style={{ background: getUrgencyColor(record.urgency) }}>
                                {idx + 1}
                            </div>
                            <div className="timeline-content">
                                <div className="timeline-date">
                                    <FaCalendar /> {record.date.toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                                <div className="timeline-card">
                                    <div className="card-header">
                                        <h3>Case #{record.id}</h3>
                                        <div className="urgency-badge" style={{ background: getUrgencyColor(record.urgency) }}>
                                            {record.urgency}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="info-row">
                                            <strong>Symptoms:</strong>
                                            <span>{record.symptoms}</span>
                                        </div>
                                        <div className="info-row">
                                            <strong>Specialty:</strong>
                                            <span>{record.specialty}</span>
                                        </div>
                                        <div className="info-row">
                                            <strong>Doctor:</strong>
                                            <span>{record.doctorName}</span>
                                        </div>
                                        <div className="info-row">
                                            <strong>Status:</strong>
                                            <span className="status-tag">{record.status}</span>
                                        </div>
                                    </div>
                                    {record.status === 'closed' && (
                                        <button 
                                            onClick={() => navigate(`/dashboard/patient/case/${record.id}`)}
                                            className="view-details-btn"
                                        >
                                            View Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={() => navigate('/dashboard/patient')} className="back-btn">
                Back to Dashboard
            </button>
        </div>
    );
};

export default MedicalHistory;
