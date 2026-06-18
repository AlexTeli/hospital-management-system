import React, { useState, useEffect } from 'react';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const patientId = user?.profileId;

    useEffect(() => {
        // Citim toate notificările stocate de microservicii sau de fluxul medicului
        const allNotifs = JSON.parse(localStorage.getItem('demo_notifications')) || [];

        // Filtrăm notificările care aparțin strict pacientului logat
        const myNotifs = allNotifs.filter(n => String(n.patientId) === String(patientId));

        // Le sortăm invers (cele mai noi primele) și adăugăm proprietatea 'read' dacă lipsește
        setNotifications(myNotifs.map(n => ({ ...n, read: n.read || false })).reverse());
    }, [patientId]);

    const markAsRead = (indexToMark) => {
        const updatedNotifs = [...notifications];
        updatedNotifs[indexToMark].read = true;
        setNotifications(updatedNotifs);

        // Opțional: salvăm starea "citit" în localStorage
        const allNotifs = JSON.parse(localStorage.getItem('demo_notifications')) || [];
        // Găsim și actualizăm în sursa principală
        const updatedAll = allNotifs.map(n =>
            (n.message === updatedNotifs[indexToMark].message && n.patientId === String(patientId))
                ? { ...n, read: true } : n
        );
        localStorage.setItem('demo_notifications', JSON.stringify(updatedAll));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #9b59b6', paddingBottom: '10px', display: 'inline-block' }}>
                🔔 Centrul de Notificări
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', maxWidth: '800px' }}>
                {notifications.length === 0 ? (
                    <p style={{ color: '#7f8c8d' }}>Nu ai nicio notificare nouă în acest moment.</p>
                ) : (
                    notifications.map((notif, index) => (
                        <div key={index} style={{
                            backgroundColor: notif.read ? '#f9f9f9' : '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            borderLeft: `5px solid ${notif.read ? '#bdc3c7' : '#f39c12'}`,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: notif.read ? 'normal' : 'bold', color: '#2c3e50' }}>
                                    {notif.message}
                                </p>
                                <small style={{ color: '#7f8c8d' }}>
                                    {notif.date}
                                </small>
                            </div>
                            {!notif.read && (
                                <button
                                    onClick={() => markAsRead(index)}
                                    style={{ backgroundColor: 'transparent', border: '1px solid #f39c12', color: '#f39c12', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Marchează ca citit
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Notifications;