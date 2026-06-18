import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const formContainer = { background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '50px auto', textAlign: 'center' };
export const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
export const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' };
export const submitBtn = { padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PATIENT'); // <-- Salvăm rolul ales
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8085/auth/login', { email, password })
            .then(res => {
                // Presupunem că backend-ul tău returnează obiectul user cu un câmp 'id' sau 'profileId'
                // Dacă backend-ul trimite ceva de genul { id: 2, role: 'PATIENT' }
                const userSession = {
                    username: email.split('@')[0],
                    email: email,
                    role: role,
                    // AICI ESTE FIXUL: Folosim ID-ul real venit de la server, nu 1
                    profileId: res.data.id || res.data.profileId || 1,
                    token: res.data.token
                };

                localStorage.setItem('user', JSON.stringify(userSession));
                navigate('/');
            })
            .catch(err => {
                alert("Credențiale invalide!");
            });
    };

    return (
        <div style={formContainer}>
            <h2>Autentificare</h2>
            <form onSubmit={handleLogin} style={formStyle}>
                <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Parolă" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required />

                {/* SELECTORUL NOU PENTRU ROL */}
                <select style={inputStyle} value={role} onChange={e => setRole(e.target.value)}>
                    <option value="PATIENT">Logare ca Pacient</option>
                    <option value="DOCTOR">Logare ca Medic</option>
                </select>

                <button type="submit" style={submitBtn}>Intră în cont</button>
            </form>
        </div>
    );
}

export default Login;