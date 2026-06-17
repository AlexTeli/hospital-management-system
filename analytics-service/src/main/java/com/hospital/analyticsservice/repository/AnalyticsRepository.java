package com.hospital.analyticsservice.repository;

import com.hospital.analyticsservice.model.HospitalReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends MongoRepository<HospitalReport, String> {
}