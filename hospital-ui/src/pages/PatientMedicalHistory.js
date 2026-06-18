import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientMedicalHistory() {
    const [history, setHistory] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        // Ascultăm schimbările din localStorage
        const handleStorageChange = () => setUser(JSON.parse(localStorage.getItem('user')));
        window.addEventListener('storage', handleStorageChange);

        if (user?.profileId) {
            axios.get(`http://localhost:8084/medical-records/patient/${user.profileId}`)
                .then(res => {
                    const myHistory = res.data.filter(r => String(r.patientId) === String(user.profileId));
                    setHistory(myHistory.reverse());
                })
                .catch(err => console.error("Eroare istoric:", err));
        }

        return () => window.removeEventListener('storage', handleStorageChange);
    }, [user]); // Acum 'user' este în dependențe!

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px', display: 'inline-block' }}>📋 Istoricul meu Medical</h2>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {history.length === 0 ? <p>Nu aveți nicio consultație înregistrată.</p> :
                    history.map((record, index) => (
                        <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #3498db', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                            <h4 style={{ margin: '0 0 10px 0', color: '#2980b9' }}>Data: {record.date ? new Date(record.date).toLocaleDateString('ro-RO') : 'N/A'}</h4>
                            <p><strong>Diagnostic:</strong> <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{record.diagnosis}</span></p>
                            <p><strong>Tratament recomandat:</strong> {record.treatment}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default PatientMedicalHistory;