package com.hospital.analyticsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "hospital_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalReport {
    @Id
    private String id;
    private String reportType; // APPOINTMENTS_COUNT, REVENUE_SUMMARY
    private Long metricValue;
    private LocalDateTime generatedAt;
}