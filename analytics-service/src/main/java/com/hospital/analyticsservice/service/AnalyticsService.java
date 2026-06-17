package com.hospital.analyticsservice.service;

import com.hospital.analyticsservice.model.DashboardStats;
import com.hospital.analyticsservice.repository.DashboardRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    private final DashboardRepository dashboardRepository;
    private final RestTemplate restTemplate;

    public AnalyticsService(DashboardRepository dashboardRepository, RestTemplate restTemplate) {
        this.dashboardRepository = dashboardRepository;
        this.restTemplate = restTemplate;
    }

    public DashboardStats generateAndSaveLiveDashboard() {
        // 1. Preluăm numărul de medici de la doctor-service
        Long doctorsCount = 0L;
        try {
            List<?> doctors = restTemplate.getForObject("http://localhost:8083/api/doctors", List.class);
            if (doctors != null) doctorsCount = (long) doctors.size();
        } catch (Exception e) {
            System.out.println("Nu s-a putut contacta doctor-service. Folosim 0.");
        }

        // 2. Preluăm toate facturile și calculăm banii strânși
        Double totalRevenue = 0.0;
        try {
            List<Map<String, Object>> bills = restTemplate.getForObject("http://localhost:8086/api/billing", List.class);
            if (bills != null) {
                for (Map<String, Object> bill : bills) {
                    // Adunăm sumele doar dacă factura are bani compleți
                    if (bill.get("amount") != null) {
                        totalRevenue += Double.parseDouble(bill.get("amount").toString());
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Nu s-a putut contacta billing-service.");
        }

        // 3. Preluăm programările și le grupăm pe zile
        Map<String, Long> appointmentsPerDay = new HashMap<>();
        try {
            List<Map<String, Object>> appointments = restTemplate.getForObject("http://localhost:8082/api/appointments", List.class);
            if (appointments != null) {
                for (Map<String, Object> app : appointments) {
                    if (app.get("appointmentDate") != null) {
                        // Extragem doar data YYYY-MM-DD dintr-un format ISO text (ex: 2026-06-25T14:30:00)
                        String fullDate = app.get("appointmentDate").toString();
                        String dateOnly = fullDate.split("T")[0];

                        appointmentsPerDay.put(dateOnly, appointmentsPerDay.getOrDefault(dateOnly, 0L) + 1);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Nu s-a putut contacta appointment-service.");
        }

        // 4. Împachetăm totul, salvăm istoricul în MongoDB și returnăm rezultatul live!
        DashboardStats liveStats = new DashboardStats(doctorsCount, totalRevenue, appointmentsPerDay);
        return dashboardRepository.save(liveStats);
    }
}