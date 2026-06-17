package com.hospital.notificationservice.service;

import com.hospital.notificationservice.model.Notification;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public Notification sendNotification(Notification notification) {
        notification.setSent(true);
        System.out.println("Se trimite notificarea prin " + notification.getType() + " catre utilizatorul " + notification.getUserId() + ": " + notification.getMessage());
        return notification;
    }
}