import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formContainer, formStyle, inputStyle, submitBtn } from './Login';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PATIENT');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8085/auth/register', { username, email, password, role })
            .then((res) => {
                alert("✅ Cont creat! Acum completează profilul.");

                // Salvăm temporar datele de bază pentru ca CompleteProfile să știe cine e
                const tempUser = {
                    email: email,
                    role: role,
                    username: username
                };
                localStorage.setItem('user', JSON.stringify(tempUser));

                navigate('/complete-profile');
            })
            .catch((err) => {
                console.error("Detalii eroare:", err);
                alert("Eroare la înregistrare: " + (err.response?.data?.error || "Email-ul există deja!"));
            });
    };

    return (
        <div style={formContainer}>
            <h2>Înregistrare Cont</h2>
            <form onSubmit={handleRegister} style={formStyle}>
                <input type="text" placeholder="Username" style={inputStyle} onChange={e => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" style={inputStyle} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Parolă" style={inputStyle} onChange={e => setPassword(e.target.value)} required />
                <select style={inputStyle} value={role} onChange={e => setRole(e.target.value)}>
                    <option value="PATIENT">Sunt Pacient</option>
                    <option value="DOCTOR">Sunt Medic</option>
                </select>
                <button type="submit" style={{...submitBtn, backgroundColor: '#3498db'}}>Continuă spre Profil</button>
            </form>
        </div>
    );
}

export default Register;