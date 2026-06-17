package com.hospital.analyticsservice.service;

import com.hospital.analyticsservice.model.HospitalReport;
import com.hospital.analyticsservice.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {
    private final AnalyticsRepository analyticsRepository;

    public List<HospitalReport> getAllReports() {
        return analyticsRepository.findAll();
    }

    public HospitalReport generateReport(String reportType, Long value) {
        HospitalReport report = new HospitalReport(null, reportType, value, LocalDateTime.now());
        return analyticsRepository.save(report);
    }
}