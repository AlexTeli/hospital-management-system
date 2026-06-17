package com.hospital.medicalrecordsservice.service;

import com.hospital.medicalrecordsservice.model.MedicalRecord;
import com.hospital.medicalrecordsservice.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public MedicalRecordService(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    public List<MedicalRecord> getAllRecords() {
        return repository.findAll();
    }

    public List<MedicalRecord> getRecordsByPatientId(Long patientId) {
        return repository.findByPatientId(patientId);
    }

    public MedicalRecord saveRecord(MedicalRecord record) {
        return repository.save(record);
    }
}