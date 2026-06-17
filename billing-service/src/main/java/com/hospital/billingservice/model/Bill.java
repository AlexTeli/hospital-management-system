package com.hospital.billingservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bills")
public class Bill {

    @Id
    private String id; // MongoDB folosește ID-uri de tip String în mod implicit
    private Long patientId;
    private Double amount;
    private String status; // ex: NEPLATIT, PLATIT
    private String description;

    // Constructor gol cerut de Spring
    public Bill() {}

    // Constructor cu parametri
    public Bill(Long patientId, Double amount, String status, String description) {
        this.patientId = patientId;
        this.amount = amount;
        this.status = status;
        this.description = description;
    }

    // Getteri și Setteri
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}