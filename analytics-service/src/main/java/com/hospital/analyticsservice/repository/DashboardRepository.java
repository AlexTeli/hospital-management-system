package com.hospital.analyticsservice.repository;

import com.hospital.analyticsservice.model.DashboardStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends MongoRepository<DashboardStats, String> {
}