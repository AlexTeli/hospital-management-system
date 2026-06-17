package com.hospital.notificationservice.controller;

import com.hospital.notificationservice.model.Notification;
import com.hospital.notificationservice.service.NotificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification send(@RequestBody Notification notification) {
        return notificationService.sendNotification(notification);
    }
}