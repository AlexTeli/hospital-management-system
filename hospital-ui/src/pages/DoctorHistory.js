import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorHistory() {
    const [history, setHistory] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);

    useEffect(() => {
        // Aducem doar cele marcate cu DONE
        axios.get(`http://localhost:8082/appointments`)
            .then(res => {
                const doneApps = res.data.filter(app => app.status === 'DONE');
                setHistory(doneApps.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)));
            })
            .catch(err => console.error(err));

        axios.get(`http://localhost:8084/medical-records`)
            .then(res => setMedicalRecords(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #34495e', paddingBottom: '10px', display: 'inline-block' }}>
                📁 Istoric Consultații
            </h2>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {history.length === 0 ? (
                    <p>Nu aveți nicio consultație finalizată (status DONE) în istoric.</p>
                ) : (
                    history.map((app) => {
                        const record = medicalRecords.slice().reverse().find(r => r.patientId.toString() === app.patientId.toString());

                        return (
                            <div key={app.id} style={{
                                backgroundColor: 'white', padding: '20px', borderRadius: '10px',
                                borderLeft: '5px solid #2ecc71', boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                display: 'flex', flexWrap: 'wrap', gap: '20px'
                            }}>
                                <div style={{ flex: '1', minWidth: '250px' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Detalii Programare</h4>
                                    <p style={{ margin: '5px 0' }}><strong>App ID:</strong> {app.id}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Pacient ID:</strong> {app.patientId}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Data:</strong> {new Date(app.appointmentDate).toLocaleString('ro-RO')}</p>
                                    <span style={{ backgroundColor: '#2ecc71', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>FINALIZAT</span>
                                </div>

                                <div style={{ flex: '2', minWidth: '300px', backgroundColor: '#f9fbf9', padding: '15px', borderRadius: '8px', border: '1px dashed #2ecc71' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>🩺 Extras Dosar Medical</h4>
                                    {record ? (
                                        <>
                                            <p style={{ margin: '5px 0' }}><strong>Diagnostic:</strong> <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{record.diagnosis}</span></p>
                                            <p style={{ margin: '5px 0' }}><strong>Tratament:</strong> {record.treatment}</p>
                                        </>
                                    ) : (
                                        <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>Lipsă dosar medical asociat.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default DoctorHistory;