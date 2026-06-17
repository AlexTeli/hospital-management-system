package com.hospital.billingservice.repository;

import com.hospital.billingservice.model.Bill;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BillRepository extends MongoRepository<Bill, String> {
    // Metodă custom ca să putem aduce toate facturile unui anumit pacient
    List<Bill> findByPatientId(Long patientId);
}