package com.hospital.doctorservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// REZOLVAREA: Forțează scanarea pachetelor unde se află interfața și entitatea ta
@EnableJpaRepositories(basePackages = "com.hospital.doctorservice.repository")
@EntityScan(basePackages = "com.hospital.doctorservice.model")
public class DoctorServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DoctorServiceApplication.class, args);
    }
}