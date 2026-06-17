package com.hospital.billingservice.service;

import com.hospital.billingservice.model.Bill;
import com.hospital.billingservice.repository.BillRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill createBill(Bill bill) {
        if (bill.getStatus() == null) {
            bill.setStatus("NEPLATIT"); // Status implicit
        }
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public List<Bill> getBillsByPatientId(Long patientId) {
        return billRepository.findByPatientId(patientId);
    }

    public Bill payBill(String id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura cu ID-ul " + id + " nu a fost găsită."));
        bill.setStatus("PLATIT");
        return billRepository.save(bill);
    }
}