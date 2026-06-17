package com.hospital.doctorservice.service;

import com.hospital.doctorservice.model.Doctor;
import com.hospital.doctorservice.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
// AM ȘTERS @RequiredArgsConstructor pentru că scriem noi constructorul manual
public class DoctorService {

    private final DoctorRepository doctorRepository;

    // CONSTRUCTORUL MANUAL PENTRU INJECTARE (Spring îl apelează automat):
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctorul cu ID-ul " + id + " nu a fost găsit."));
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}