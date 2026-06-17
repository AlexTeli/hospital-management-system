package com.hospital.analyticsservice.controller;

import com.hospital.analyticsservice.model.HospitalReport;
import com.hospital.analyticsservice.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @GetMapping
    public List<HospitalReport> getReports() {
        return analyticsService.getAllReports();
    }

    @PostMapping("/generate")
    public HospitalReport generate(@RequestParam String type, @RequestParam Long value) {
        return analyticsService.generateReport(type, value);
    }
}