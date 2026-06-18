import React, { useState, useEffect } from 'react';
import axios from 'axios';

const localInputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%', boxSizing: 'border-box' };
const localSubmitBtn = { padding: '12px', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '100%' };

function DoctorSchedule() {
    const [appointments, setAppointments] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');

    // NOU: Stare pentru suma facturii
    const [amount, setAmount] = useState('');

    const [statusMesaj, setStatusMesaj] = useState("Se încarcă datele...");

    let user = { username: 'Medic', profileId: 1 };
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            user = JSON.parse(storedUser);
        }
    } catch (e) { console.error(e); }

    const doctorId = user?.profileId || 1;

    const loadAppointments = () => {
        axios.get(`http://localhost:8082/appointments`)
            .then(res => {
                if (Array.isArray(res.data)) {
                    const activeApps = res.data.filter(app => app.status !== 'DONE');
                    setAppointments(activeApps);
                    setStatusMesaj(activeApps.length === 0 ? "Nu există nicio programare activă." : "");
                } else if (res.data && res.data.id) {
                    const singleApp = res.data.status !== 'DONE' ? [res.data] : [];
                    setAppointments(singleApp);
                    setStatusMesaj(singleApp.length === 0 ? "Singura programare găsită este deja DONE." : "");
                }
            })
            .catch(err => setStatusMesaj(`Eroare de conexiune la 8082: ${err.message}`));
    };

    useEffect(() => { loadAppointments(); }, []);

    const handleCreateMedicalRecord = (e) => {
        e.preventDefault();

        const recordData = {
            patientId: selectedApp.patientId,
            doctorId: doctorId,
            diagnosis: diagnosis,
            treatment: treatment,
            date: new Date().toISOString()
        };

        // 1. Salvăm Dosarul Medical (8084)
        axios.post('http://localhost:8084/medical-records', recordData)
            .then(() => {
                // 2. Schimbăm programarea în DONE (8082)
                const updatedAppointment = { ...selectedApp, status: 'DONE' };
                return axios.put(`http://localhost:8082/appointments/${selectedApp.id}`, updatedAppointment);
            })
            .then(() => {
                // 3. NOU: Trimitem factura către portul 8086, ruta /api/billing
                const billData = {
                    patientId: selectedApp.patientId,
                    amount: parseFloat(amount),
                    status: 'NEPLATIT', // <-- Am schimbat pe română
                    description: `Consultație Dr. ${user.username} - Diagnostic: ${diagnosis}` // Trimitem și descrierea cerută de modelul tău Java!
                };
                return axios.post('http://localhost:8086/api/billing', billData); // <-- Am schimbat ruta
            })
            .then(() => {
                // 4. Notificarea demo pentru pacient
                const newNotification = {
                    patientId: selectedApp.patientId.toString(),
                    message: `🩺 Consultație finalizată de Dr. ${user.username}. S-a emis o factură de ${amount} RON. Vezi fișa medicală în meniul "Istoric Medical" și achită factura la "Facturi".`,
                    date: new Date().toLocaleString('ro-RO'),
                    read: false
                };

                const existingNotifs = JSON.parse(localStorage.getItem('demo_notifications')) || [];
                localStorage.setItem('demo_notifications', JSON.stringify([...existingNotifs, newNotification]));

                try {
                    const existingNotifs = JSON.parse(localStorage.getItem('demo_notifications')) || [];
                    localStorage.setItem('demo_notifications', JSON.stringify([...existingNotifs, newNotification]));
                } catch(e) { console.log(e); }

                alert("✅ Consultație finalizată și Factură emisă cu succes!");
                setSelectedApp(null);
                setDiagnosis('');
                setTreatment('');
                setAmount('');
                loadAppointments();
            })
            .catch(err => {
                console.error(err);
                alert("Eroare pe flux! Verifică dacă portul 8086 (Billing) e pornit și are metoda POST.");
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #e74c3c', paddingBottom: '10px', display: 'inline-block' }}>
                📅 Gestionare Consultații
            </h2>

            {statusMesaj && (
                <div style={{ backgroundColor: '#f1c40f', padding: '15px', borderRadius: '5px', fontWeight: 'bold', marginBottom: '20px', color: '#2c3e50' }}>
                    📡 Info Sistem: {statusMesaj}
                </div>
            )}

            <div style={{ display: 'flex', gap: '30px', marginTop: '10px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    {appointments.map((app) => (
                        <div key={app.id} style={{
                            backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px',
                            borderLeft: '5px solid #3498db', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <p><strong>App ID:</strong> {app.id}</p>
                            <p><strong>Pacient ID:</strong> {app.patientId}</p>
                            <p><strong>Data:</strong> {new Date(app.appointmentDate).toLocaleString('ro-RO')}</p>
                            <p><strong>Status:</strong> <span style={{fontWeight:'bold', color: '#e67e22'}}>{app.status}</span></p>

                            <button
                                onClick={() => setSelectedApp(app)}
                                style={{ ...localSubmitBtn, backgroundColor: '#e67e22', marginTop: '10px' }}>
                                🩺 Începe Consultația
                            </button>
                        </div>
                    ))}
                </div>

                {selectedApp && (
                    <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                        <h3 style={{ color: '#e67e22', marginTop: 0 }}>📝 Fișă Consultație - Pacient #{selectedApp.patientId}</h3>
                        <form onSubmit={handleCreateMedicalRecord} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input type="text" style={localInputStyle} placeholder="Diagnostic" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} required />
                            <textarea style={{ ...localInputStyle, height: '100px', resize: 'vertical' }} placeholder="Tratament..." value={treatment} onChange={e => setTreatment(e.target.value)} required />

                            {/* NOU: Câmp pentru preț */}
                            <label style={{ fontWeight: 'bold', color: '#2c3e50', marginTop: '5px' }}>Preț Consultație (RON):</label>
                            <input type="number" style={{...localInputStyle, border: '2px solid #f39c12'}} placeholder="Ex: 150" value={amount} onChange={e => setAmount(e.target.value)} required min="1" />

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" style={{ ...localSubmitBtn, backgroundColor: '#2ecc71', margin: 0, flex: 1 }}>Salvează & Emite Factură</button>
                                <button type="button" onClick={() => setSelectedApp(null)} style={{ ...localSubmitBtn, backgroundColor: '#95a5a6', margin: 0, flex: 1 }}>Anulează</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorSchedule;