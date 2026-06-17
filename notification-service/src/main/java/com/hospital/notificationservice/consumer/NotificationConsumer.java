package com.hospital.notificationservice.consumer;

import com.hospital.notificationservice.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void consumeNotificationMessage(String message) {
        System.out.println("=================================================");
        System.out.println("[NOTIFICATION SERVICE] -> UN NOU MESAJ A FOST PRINS DIN RABBITMQ!");
        System.out.println("[EMAIL SIMULAT] Trimitere notificare: " + message);
        System.out.println("=================================================");
    }
}