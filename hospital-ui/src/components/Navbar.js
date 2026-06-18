import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ backgroundColor: '#2c3e50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
            <h2 style={{ margin: 0 }}>🏥 Spitalul MediCore</h2>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/" style={linkStyle}>Acasă</Link>
                <Link to="/dashboard" style={linkStyle}>Analytics</Link>

                {user ? (
                    <>
                        {/* Meniu Pacient */}
                        {user.role === 'PATIENT' && (
                            <>
                                <Link to="/programare" style={linkStyle}>Fă o programare</Link>
                                <Link to="/facturi" style={linkStyle}>Facturile Mele</Link>
                                <Link to="/istoric-medical" style={linkStyle}>Istoric Medical</Link>
                            </>
                        )}

                        {/* Meniu Medic */}
                        {user.role === 'DOCTOR' && (
                            <>
                                {/* Rutele trebuie să corespundă cu ce ai în App.js */}
                                <Link to="/doctor-schedule" style={linkStyle}>Calendarul Meu</Link>
                                <Link to="/doctor-history" style={linkStyle}>Istoric Consultații</Link>
                                <Link to="/facturi" style={linkStyle}>Toate Facturile</Link>
                            </>
                        )}

                        {/* ZONA COMUNĂ (Notificări & Profil) */}
                        <Link to="/notificari" style={{...linkStyle, backgroundColor: '#34495e', padding: '5px 10px', borderRadius: '5px'}}>
                            🔔 Notificări <span style={{backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '12px', marginLeft: '5px'}}>Nou</span>
                        </Link>

                        <span style={{ color: '#f1c40f', fontWeight: 'bold', marginLeft: '10px' }}>Salut, {user.username}!</span>
                        <button onClick={handleLogout} style={btnStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={btnStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

const linkStyle = { color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: '500', transition: '0.2s' };
const btnStyle = { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none', fontWeight: 'bold' };

export default Navbar;