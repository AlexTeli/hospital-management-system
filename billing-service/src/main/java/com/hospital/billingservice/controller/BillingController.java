package com.hospital.billingservice.controller;

import com.hospital.billingservice.model.Bill;
import com.hospital.billingservice.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {
    private final BillingService billingService;

    @GetMapping
    public List<Bill> getAllBills() {
        return billingService.getAllBills();
    }

    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        return billingService.createBill(bill);
    }
}