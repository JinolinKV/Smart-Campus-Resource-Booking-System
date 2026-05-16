package com.management.LabManagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "requests")
public class ResourceRequest {

    @Id
    private String id;

    private String name;
    private String email;
    private String year;
    private String occasion;
    private String venue;

    private LocalDate date;

    private int startPeriod;
    private int endPeriod;

    private String status;

    private int rejectionCount = 0;
    private int effectivePriority = 0;

    private String rejectionReason;

    private boolean forceReplace = false;

    private String title;
    private String description;
    private String replacementReason;

    // ---------------- GETTERS & SETTERS ----------------

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getStartPeriod() {
        return startPeriod;
    }

    public void setStartPeriod(int startPeriod) {
        this.startPeriod = startPeriod;
    }

    public int getEndPeriod() {
        return endPeriod;
    }

    public void setEndPeriod(int endPeriod) {
        this.endPeriod = endPeriod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRejectionCount() {
        return rejectionCount;
    }

    public void setRejectionCount(int rejectionCount) {
        this.rejectionCount = rejectionCount;
    }

    public int getEffectivePriority() {
        return effectivePriority;
    }

    public void setEffectivePriority(int effectivePriority) {
        this.effectivePriority = effectivePriority;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public boolean isForceReplace() {
        return forceReplace;
    }

    public void setForceReplace(boolean forceReplace) {
        this.forceReplace = forceReplace;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReplacementReason() {
        return replacementReason;
    }

    public void setReplacementReason(String replacementReason) {
        this.replacementReason = replacementReason;
    }
}