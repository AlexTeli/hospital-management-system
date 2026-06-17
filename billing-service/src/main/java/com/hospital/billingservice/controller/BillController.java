package com.hospital.billingservice.controller;

import com.hospital.billingservice.model.Bill;
import com.hospital.billingservice.service.BillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // 1. Creează o factură nouă
    @PostMapping
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(billService.createBill(bill));
    }

    // 2. Aduce toate facturile din sistem
    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(billService.getAllBills());
    }

    // 3. Aduce facturile unui anumit pacient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Bill>> getBillsByPatientId(@PathVariable Long patientId) {
        return ResponseEntity.ok(billService.getBillsByPatientId(patientId));
    }

    // 4. Plătește o factură (schimbă statusul în PLATIT)
    @PutMapping("/{id}/pay")
    public ResponseEntity<Bill> payBill(@PathVariable String id) {
        return ResponseEntity.ok(billService.payBill(id));
    }
}