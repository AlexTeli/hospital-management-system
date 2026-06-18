import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Billing() {
    const [bills, setBills] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const handleStorage = () => setUser(JSON.parse(localStorage.getItem('user')));
        window.addEventListener('storage', handleStorage);

        if (user) {
            axios.get('http://localhost:8086/api/billing')
                .then(res => {
                    if (user.role === 'PATIENT') {
                        setBills(res.data.filter(b => String(b.patientId) === String(user.profileId)));
                    } else {
                        setBills(res.data);
                    }
                })
                .catch(err => console.error("Eroare billing:", err));
        }
        return () => window.removeEventListener('storage', handleStorage);
    }, [user]);

    const handlePay = (billId) => {
        axios.put(`http://localhost:8086/api/billing/${billId}/pay`)
            .then(() => {
                alert("✅ Plata procesată!");
                setBills(bills.map(b => b.id === billId ? { ...b, status: 'PLATIT' } : b));
            })
            .catch(err => alert("Eroare la plată!"));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #f39c12', paddingBottom: '10px', display: 'inline-block' }}>
                💳 Facturi și Plăți
            </h2>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '20px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#ecf0f1', textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>ID Factură</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>ID Pacient</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>Descriere</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>Sumă (RON)</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>Status</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #bdc3c7' }}>Acțiune</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bills.length === 0 ? (
                        <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>Nu există facturi înregistrate.</td></tr>
                    ) : (
                        bills.map(bill => (
                            <tr key={bill.id} style={{ borderBottom: '1px solid #eee', transition: '0.2s' }}>
                                <td style={{ padding: '12px', fontSize: '12px', color: '#7f8c8d' }}>{bill.id}</td>
                                <td style={{ padding: '12px' }}>{bill.patientId}</td>
                                <td style={{ padding: '12px', fontStyle: 'italic' }}>{bill.description || 'Consultație medicală'}</td>
                                <td style={{ padding: '12px', fontWeight: 'bold', color: '#e67e22' }}>{bill.amount} RON</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                                        backgroundColor: bill.status === 'PLATIT' ? '#d4efdf' : '#fadbd8',
                                        color: bill.status === 'PLATIT' ? '#27ae60' : '#c0392b'
                                    }}>
                                      {bill.status}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    {bill.status !== 'PLATIT' && user?.role === 'PATIENT' ? (
                                        <button onClick={() => handlePay(bill.id)} style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                                            💳 Achită Acum
                                        </button>
                                    ) : bill.status === 'PLATIT' ? (
                                        <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✓ Achitat</span>
                                    ) : (
                                        <span style={{ color: '#95a5a6', fontSize: '13px' }}>Așteaptă plata</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Billing;