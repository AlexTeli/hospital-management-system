package com.hospital.billingservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Document(collection = "bills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bill {
    @Id
    private String id;
    private Long appointmentId;
    private BigDecimal amount;
    private String status; // PAID, UNPAID
}