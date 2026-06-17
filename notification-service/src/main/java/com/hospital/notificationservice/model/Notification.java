package com.hospital.notificationservice.model;

public class Notification {
    private String id;
    private Long userId;
    private String message;
    private String type; // EMAIL, SMS
    private boolean sent;

    public Notification() {
    }

    public Notification(String id, Long userId, String message, String type, boolean sent) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.sent = sent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isSent() {
        return sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }
}