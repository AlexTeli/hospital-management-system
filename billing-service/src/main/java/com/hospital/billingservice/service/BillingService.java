package com.hospital.billingservice.service;

import com.hospital.billingservice.model.Bill;
import com.hospital.billingservice.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {
    private final BillRepository billRepository;

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }
}