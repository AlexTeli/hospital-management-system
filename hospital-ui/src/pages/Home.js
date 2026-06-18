import React from 'react';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" alt="Hospital" style={{ width: '150px' }} />
            <h1 style={{ color: '#2c3e50' }}>Bun venit la MediCore Sistemul Central</h1>
            <p style={{ fontSize: '18px', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
                Această platformă conectează 8 microservicii distribuite pentru a asigura o experiență perfectă pentru pacienți și medici.
            </p>
        </div>
    );
}

export default Home;