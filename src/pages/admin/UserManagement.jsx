import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../data/mockData';
import { FaSearch, FaCheck, FaTimes, FaUserEdit } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [users, setUsers] = useState(mockUsers);

    const filteredUsers = users.filter(u => {
        const matchesSearch = searchQuery === '' || 
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleApprove = (userId) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'active' } : u));
        alert('User approved successfully!');
    };

    const handleDeactivate = (userId) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: 'inactive' } : u));
        alert('User deactivated!');
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            patient: '#14b8a6',
            worker: '#3b82f6',
            doctor: '#8b5cf6',
            admin: '#ef4444'
        };
        return colors[role] || '#64748b';
    };

    return (
        <div className="user-management-page">
            <div className="page-header">
                <h1>User Management</h1>
                <p className="subtitle">Manage all system users and permissions</p>
            </div>

            <div className="search-filter-bar">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="all">All Roles</option>
                    <option value="patient">Patients</option>
                    <option value="worker">Health Workers</option>
                    <option value="doctor">Doctors</option>
                    <option value="admin">Admins</option>
                </select>
            </div>

            <div className="users-table">
                <div className="table-header">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Registered</div>
                    <div>Actions</div>
                </div>
                {filteredUsers.map(user => (
                    <div key={user.id} className="table-row">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                        <div>
                            <span className="role-badge" style={{ background: getRoleBadgeColor(user.role) }}>
                                {user.role}
                            </span>
                        </div>
                        <div>
                            <span className={`status-badge ${user.status}`}>
                                {user.status}
                            </span>
                        </div>
                        <div className="registered-date">
                            {user.registeredAt.toLocaleDateString()}
                        </div>
                        <div className="actions">
                            {user.status === 'pending' && (
                                <button className="approve-btn" onClick={() => handleApprove(user.id)}>
                                    <FaCheck /> Approve
                                </button>
                            )}
                            {user.status === 'active' && (
                                <button className="deactivate-btn" onClick={() => handleDeactivate(user.id)}>
                                    <FaTimes /> Deactivate
                                </button>
                            )}
                            <button className="edit-btn">
                                <FaUserEdit /> Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate('/dashboard/admin')} className="back-btn">
                Back to Dashboard
            </button>
        </div>
    );
};

export default UserManagement;
