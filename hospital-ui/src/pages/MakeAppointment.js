import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formContainer, formStyle, inputStyle, submitBtn } from './Login';

function MakeAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        // 1. Am corectat URL-ul la /api/doctors
        axios.get('http://localhost:8083/api/doctors')
            .then(res => {
                setDoctors(res.data);
            })
            .catch(err => console.error("Eroare la aducerea medicilor:", err));
    }, []);

    const handleAppointment = (e) => {
        e.preventDefault();

        // Asigurăm că avem profileId-ul (ID-ul real de pacient) pentru a face programarea
        const patientId = user.profileId || user.id;

        const appointmentData = {
            patientId: patientId,
            doctorId: selectedDoctor,
            appointmentDate: date,
            status: "CONFIRMED"
        };

        axios.post('http://localhost:8082/appointments', appointmentData)
            .then(() => alert("✅ Programare realizată cu succes!"))
            .catch((err) => alert("Eroare la crearea programării. Ai pornit portul 8082?"));
    };

    return (
        <div style={{...formContainer, maxWidth: '600px'}}>
            <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
                Programează o consultație
            </h2>
            <form onSubmit={handleAppointment} style={formStyle}>
                <label style={{ textAlign: 'left', fontWeight: 'bold' }}>Alege medicul:</label>
                <select style={inputStyle} value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} required>
                    <option value="">-- Selectează un medic --</option>
                    {doctors.map(doc => (
                        // 2. Am corectat variabilele la firstName, lastName și specialization
                        <option key={doc.id} value={doc.id}>
                            Dr. {doc.firstName} {doc.lastName} ({doc.specialization})
                        </option>
                    ))}
                </select>

                <label style={{ textAlign: 'left', fontWeight: 'bold' }}>Data și Ora:</label>
                <input type="datetime-local" style={inputStyle} value={date} onChange={e => setDate(e.target.value)} required />

                <button type="submit" style={submitBtn}>Confirmă Programarea</button>
            </form>
        </div>
    );
}

export default MakeAppointment;