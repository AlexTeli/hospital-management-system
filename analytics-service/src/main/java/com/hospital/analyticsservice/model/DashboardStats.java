package com.hospital.analyticsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "dashboard_stats")
public class DashboardStats {

    @Id
    private String id;
    private LocalDateTime calculatedAt;
    private Long totalDoctors;
    private Double totalRevenueThisMonth;
    private Map<String, Long> appointmentsPerDay; // Salvează perechi de tipul {"2026-06-25": 5, "2026-06-26": 3}

    public DashboardStats() {}

    public DashboardStats(Long totalDoctors, Double totalRevenueThisMonth, Map<String, Long> appointmentsPerDay) {
        this.calculatedAt = LocalDateTime.now();
        this.totalDoctors = totalDoctors;
        this.totalRevenueThisMonth = totalRevenueThisMonth;
        this.appointmentsPerDay = appointmentsPerDay;
    }

    // Getteri și Setteri
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDateTime getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(LocalDateTime calculatedAt) { this.calculatedAt = calculatedAt; }

    public Long getTotalDoctors() { return totalDoctors; }
    public void setTotalDoctors(Long totalDoctors) { this.totalDoctors = totalDoctors; }

    public Double getTotalRevenueThisMonth() { return totalRevenueThisMonth; }
    public void setTotalRevenueThisMonth(Double totalRevenueThisMonth) { this.totalRevenueThisMonth = totalRevenueThisMonth; }

    public Map<String, Long> getAppointmentsPerDay() { return appointmentsPerDay; }
    public void setAppointmentsPerDay(Map<String, Long> appointmentsPerDay) { this.appointmentsPerDay = appointmentsPerDay; }
}