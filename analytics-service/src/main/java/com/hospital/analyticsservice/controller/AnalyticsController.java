package com.hospital.analyticsservice.controller;

import com.hospital.analyticsservice.model.DashboardStats;
import com.hospital.analyticsservice.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // Solicită generarea unui dashboard live bazat pe datele reale curente
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStats> getLiveDashboard() {
        return ResponseEntity.ok(analyticsService.generateAndSaveLiveDashboard());
    }
}