export const mockCases = [
    {
        id: 1,
        patientName: "Asha Kumar",
        age: 34,
        village: "Rampur",
        symptoms: ["Fever", "Cough", "Fatigue"],
        vitals: { temp: 101.2, hr: 88, spo2: 96 },
        urgency: "HIGH",
        specialty: "Pulmonology",
        reason: "High fever with respiratory symptoms requires immediate attention",
        status: "reviewed",
        submittedAt: new Date(Date.now() - 5 * 60000),
        reviewedAt: new Date(Date.now() - 2 * 60000),
        doctorName: "Dr. Sharma",
        doctorNotes: "Patient shows signs of respiratory infection. Prescribed antibiotics and rest. Monitor temperature closely.",
        prescription: "Azithromycin 500mg once daily for 5 days\nParacetamol 500mg every 6 hours for fever\nRest and hydration"
    },
    {
        id: 2,
        patientName: "Raju Singh",
        age: 52,
        village: "Dharampur",
        symptoms: ["Chest pain", "Shortness of breath"],
        vitals: { temp: 98.6, hr: 102, spo2: 94 },
        urgency: "MEDIUM",
        specialty: "Cardiology",
        reason: "Chest pain with elevated heart rate needs evaluation",
        status: "under_review",
        submittedAt: new Date(Date.now() - 20 * 60000),
        reviewedAt: null,
        doctorName: "Dr. Patel",
        doctorNotes: null,
        prescription: null
    },
    {
        id: 3,
        patientName: "Meera Devi",
        age: 28,
        village: "Surajpur",
        symptoms: ["Headache", "Nausea"],
        vitals: { temp: 98.4, hr: 72, spo2: 98 },
        urgency: "LOW",
        specialty: "General Medicine",
        reason: "Common symptoms, likely viral infection",
        status: "closed",
        submittedAt: new Date(Date.now() - 2 * 60 * 60000),
        reviewedAt: new Date(Date.now() - 1 * 60 * 60000),
        doctorName: "Dr. Kumar",
        doctorNotes: "Rest and hydration recommended. Paracetamol for headache.",
        prescription: "Paracetamol 500mg every 6 hours as needed"
    }
];

export const workerCases = [
    {
        id: 1,
        patientName: "Rajesh Kumar",
        age: 45,
        village: "Dharampur",
        contact: "9876543210",
        symptoms: ["Fever", "Cough", "Body ache"],
        vitals: { temp: 101, hr: 88, spo2: 96 },
        urgency: "HIGH",
        specialty: "Pulmonology",
        status: "reviewed",
        doctorAssigned: "Dr. Sharma",
        submittedBy: "Worker: Priya Singh",
        submittedAt: new Date(Date.now() - 3 * 60 * 60000),
        prescription: "Azithromycin 500mg once daily for 5 days"
    },
    {
        id: 2,
        patientName: "Sunita Devi",
        age: 32,
        village: "Rampur",
        contact: "9123456789",
        symptoms: ["Headache", "Dizziness"],
        vitals: { temp: 98.6, hr: 75, spo2: 98 },
        urgency: "LOW",
        specialty: "General Medicine",
        status: "under_review",
        doctorAssigned: "Dr. Kumar",
        submittedBy: "Worker: Priya Singh",
        submittedAt: new Date(Date.now() - 1 * 60 * 60000),
        prescription: null
    }
];

export const mockPatientHistory = [
    {
        id: 1,
        date: new Date(Date.now() - 5 * 60000),
        urgency: "HIGH",
        status: "reviewed",
        symptoms: "Fever, Cough, Fatigue",
        specialty: "Pulmonology",
        doctorName: "Dr. Sharma"
    },
    {
        id: 2,
        date: new Date(Date.now() - 7 * 24 * 60 * 60000),
        urgency: "LOW",
        status: "closed",
        symptoms: "Headache, Nausea",
        specialty: "General Medicine",
        doctorName: "Dr. Kumar"
    },
    {
        id: 3,
        date: new Date(Date.now() - 14 * 24 * 60 * 60000),
        urgency: "MEDIUM",
        status: "closed",
        symptoms: "Body ache, Fatigue",
        specialty: "General Medicine",
        doctorName: "Dr. Verma"
    }
];

export const mockUsers = [
    { id: 1, name: "John Patient", email: "patient@test.com", role: "patient", status: "active", registeredAt: new Date(Date.now() - 30 * 24 * 60 * 60000) },
    { id: 2, name: "Priya Singh", email: "worker@test.com", role: "worker", status: "active", registeredAt: new Date(Date.now() - 25 * 24 * 60 * 60000) },
    { id: 3, name: "Dr. Sharma", email: "doctor@test.com", role: "doctor", status: "active", registeredAt: new Date(Date.now() - 20 * 24 * 60 * 60000) },
    { id: 4, name: "Admin User", email: "admin@test.com", role: "admin", status: "active", registeredAt: new Date(Date.now() - 60 * 24 * 60 * 60000) },
    { id: 5, name: "Dr. Patel", email: "patel@test.com", role: "doctor", status: "pending", registeredAt: new Date(Date.now() - 2 * 24 * 60 * 60000) },
];

export const mockAnalytics = {
    totalCases: 156,
    casesByUrgency: { HIGH: 23, MEDIUM: 67, LOW: 66 },
    casesBySpecialty: { "General Medicine": 89, "Cardiology": 34, "Pulmonology": 33 },
    avgResponseTime: "2.5 hours",
    activeUsers: 342,
    casesThisWeek: 45,
    casesThisMonth: 156
};

export const mockLogs = [
    { id: 1, type: "Login", user: "doctor@test.com", action: "Logged in successfully", timestamp: new Date(Date.now() - 10 * 60000) },
    { id: 2, type: "Case Submitted", user: "patient@test.com", action: "New case #123 submitted", timestamp: new Date(Date.now() - 25 * 60000) },
    { id: 3, type: "Review", user: "doctor@test.com", action: "Reviewed case #122", timestamp: new Date(Date.now() - 45 * 60000) },
    { id: 4, type: "Login", user: "worker@test.com", action: "Logged in successfully", timestamp: new Date(Date.now() - 60 * 60000) },
    { id: 5, type: "Error", user: "system", action: "Failed to load patient data", timestamp: new Date(Date.now() - 90 * 60000) },
];

export const mockFeedback = [
    { id: 1, user: "patient@test.com", message: "The app is very helpful! Easy to use.", status: "resolved", submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60000) },
    { id: 2, user: "worker@test.com", message: "Need offline mode improvements", status: "in_progress", submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60000) },
    { id: 3, user: "doctor@test.com", message: "Case queue loading is slow sometimes", status: "new", submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60000) },
];

export const getStatusConfig = (status) => {
    const configs = {
        pending: { label: 'Pending Review', color: '#f59e0b', icon: '⏳', step: 1 },
        under_review: { label: 'Under Review', color: '#3b82f6', icon: '👨‍⚕️', step: 2 },
        reviewed: { label: 'Reviewed', color: '#14b8a6', icon: '✅', step: 3 },
        closed: { label: 'Closed', color: '#64748b', icon: '🔒', step: 4 }
    };
    return configs[status] || configs.pending;
};

export const runMockTriage = (symptoms, vitals) => {
    const hasHighFever = vitals.temp > 100;
    const hasLowSpo2 = vitals.spo2 < 95;
    const hasChestPain = symptoms.some(s => s.toLowerCase().includes('chest'));
    
    let urgency = "LOW";
    let specialty = "General Medicine";
    let reason = "Symptoms appear manageable with basic care";
    
    if (hasChestPain || hasLowSpo2) {
        urgency = "HIGH";
        specialty = hasChestPain ? "Cardiology" : "Pulmonology";
        reason = "Critical symptoms detected requiring immediate medical attention";
    } else if (hasHighFever) {
        urgency = "MEDIUM";
        specialty = "General Medicine";
        reason = "Elevated temperature requires monitoring and treatment";
    }
    
    return { urgency, specialty, reason };
};

let offlineQueueData = [];

export const getOfflineQueue = () => offlineQueueData;

export const addToOfflineQueue = (caseData) => {
    const newCase = { ...caseData, id: Date.now(), savedAt: new Date() };
    offlineQueueData.push(newCase);
    localStorage.setItem('offlineQueue', JSON.stringify(offlineQueueData));
    return newCase;
};

export const removeFromOfflineQueue = (id) => {
    offlineQueueData = offlineQueueData.filter(c => c.id !== id);
    localStorage.setItem('offlineQueue', JSON.stringify(offlineQueueData));
};

export const loadOfflineQueue = () => {
    const stored = localStorage.getItem('offlineQueue');
    if (stored) {
        offlineQueueData = JSON.parse(stored);
    }
};
