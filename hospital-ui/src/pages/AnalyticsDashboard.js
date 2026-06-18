import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyticsDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8088/api/analytics/dashboard')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #2ecc71', paddingBottom: '10px', display: 'inline-block' }}>
                📊 Dashboard Administrativ
            </h2>

            {!stats ? <p>Se încarcă datele din MongoDB...</p> : (
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={statCard('#3498db')}>
                        <h3>Total Doctori</h3>
                        <p style={{ fontSize: '36px', margin: 0 }}>{stats.totalDoctors}</p>
                    </div>
                    <div style={statCard('#e67e22')}>
                        <h3>Încasări Totale</h3>
                        <p style={{ fontSize: '36px', margin: 0 }}>{stats.totalRevenueThisMonth} RON</p>
                    </div>
                </div>
            )}
        </div>
    );
}

const statCard = (color) => ({ backgroundColor: 'white', padding: '30px', borderRadius: '10px', borderTop: `5px solid ${color}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 1, textAlign: 'center', color: '#2c3e50' });

export default AnalyticsDashboard;