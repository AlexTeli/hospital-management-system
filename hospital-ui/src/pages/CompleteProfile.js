import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formContainer, formStyle, inputStyle, submitBtn } from './Login';

function CompleteProfile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Stări pentru Pacient
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Masculin');

    // Stări pentru Medic (Corectate conform Java)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.role === 'PATIENT') {
            // În handleSubmit pentru Pacient/Medic din CompleteProfile.js:
            axios.post('http://localhost:8081/patients', { name, age: parseInt(age), gender })
                .then(res => {
                    alert("✅ Profilul de Pacient a fost creat!");
                    // AICI ESTE SECRETUL:
                    // Actualizăm obiectul 'user' din localStorage cu ID-ul real de pacient (res.data.id)
                    const updatedUser = {
                        ...user,
                        profileId: res.data.id, // Acesta este ID-ul din tabelul de pacienți!
                        profileName: res.data.name
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    navigate('/');
                })
                .catch(err => {
                    console.error("Eroare completă:", err);
                    alert("Detalii eroare: " + err.message + (err.response ? " - " + JSON.stringify(err.response.data) : ""));
                });
        }
        else if (user.role === 'DOCTOR') {
            // Potrivire EXACTĂ cu formatul din modelul Doctor.java
            const doctorData = {
                firstName: firstName,
                lastName: lastName,
                specialization: specialization,
                email: user.email // Luăm email-ul creat la pasul anterior
            };

            // Apelăm endpoint-ul corect: /api/doctors
            axios.post('http://localhost:8083/api/doctors', doctorData)
                .then(res => {
                    alert("✅ Profilul de Medic a fost creat cu succes!");
                    // Salvăm ID-ul ca să știm ce medic este logat
                    const updatedUser = { ...user, profileId: res.data.id, profileName: res.data.lastName };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    navigate('/');
                })
                .catch(err => alert("Eroare la salvarea medicului: " + err.message));
        }
    };

    return (
        <div style={{...formContainer, maxWidth: '500px'}}>
            <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
                Pasul 2: Completează Profilul de {user.role === 'PATIENT' ? 'Pacient' : 'Medic'}
            </h2>

            <form onSubmit={handleSubmit} style={formStyle}>

                {/* Câmpuri specifice pentru PACIENT */}
                {user.role === 'PATIENT' && (
                    <>
                        <input type="text" placeholder="Nume Complet" style={inputStyle} value={name} onChange={e => setName(e.target.value)} required />
                        <input type="number" placeholder="Vârstă" style={inputStyle} value={age} onChange={e => setAge(e.target.value)} required />
                        <select style={inputStyle} value={gender} onChange={e => setGender(e.target.value)}>
                            <option value="Masculin">Masculin</option>
                            <option value="Feminin">Feminin</option>
                        </select>
                    </>
                )}

                {/* Câmpuri specifice pentru MEDIC (aliniate cu Java) */}
                {user.role === 'DOCTOR' && (
                    <>
                        <input type="text" placeholder="Prenume (First Name)" style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        <input type="text" placeholder="Nume de familie (Last Name)" style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)} required />
                        <input type="text" placeholder="Specializare (Ex: Cardiologie)" style={inputStyle} value={specialization} onChange={e => setSpecialization(e.target.value)} required />
                    </>
                )}

                <button type="submit" style={submitBtn}>Finalizează Înregistrarea</button>
            </form>
        </div>
    );
}

export default CompleteProfile;