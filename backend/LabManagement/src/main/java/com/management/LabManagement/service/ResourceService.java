package com.management.LabManagement.service;

import com.management.LabManagement.model.ResourceRequest;
import com.management.LabManagement.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private MailService mailService;

    private final List<String> allVenues = List.of(
            "Conference Hall",
            "EG Hall",
            "CSE LAB",
            "NM LAB"
    );

    // ---------------- BASE PRIORITY ----------------
    private int getBasePriority(String occasion) {

        if (occasion == null) return 0;

        switch (occasion.toLowerCase()) {

            case "workshop":
                return 4;

            case "seminar":
                return 3;

            case "event":
                return 2;

            case "class":
                return 1;

            default:
                return 0;
        }
    }

    // ---------------- EFFECTIVE PRIORITY ----------------
    private int getEffectivePriority(ResourceRequest req) {

        int base = getBasePriority(req.getOccasion());

        if (req.getRejectionCount() >= 3) {
            return base + req.getRejectionCount() + 2;
        }

        return base + req.getRejectionCount();
    }

    // ---------------- AVAILABLE VENUES ----------------
    private List<String> getAvailableVenues(LocalDate date, int start, int end) {

        List<ResourceRequest> approved =
                resourceRepository.findByDateAndStatusIn(
                        date,
                        List.of("SUCCESS", "REPLACED")
                );

        List<String> booked = approved.stream()
                .filter(r -> start <= r.getEndPeriod() &&
                        end >= r.getStartPeriod())
                .map(ResourceRequest::getVenue)
                .toList();

        return allVenues.stream()
                .filter(v -> !booked.contains(v))
                .toList();
    }

    // ---------------- CREATE REQUEST ----------------
    public Map<String, Object> createRequest(ResourceRequest newRequest) {

        Map<String, Object> response = new HashMap<>();

        try {

            LocalDate date = newRequest.getDate();

            Optional<ResourceRequest> existingOpt =
                    resourceRepository.findFirstByNameAndDateAndStartPeriodAndEndPeriodOrderByRejectionCountDesc(
                            newRequest.getName(),
                            newRequest.getDate(),
                            newRequest.getStartPeriod(),
                            newRequest.getEndPeriod()
                    );

            ResourceRequest request;

            if (existingOpt.isPresent()) {

                request = existingOpt.get();

                request.setVenue(newRequest.getVenue());
                request.setOccasion(newRequest.getOccasion());
                request.setTitle(newRequest.getTitle());
                request.setDescription(newRequest.getDescription());
                request.setForceReplace(newRequest.isForceReplace());

            } else {

                request = newRequest;
                request.setRejectionCount(0);
            }

            int newPriority = getEffectivePriority(request);

            request.setEffectivePriority(newPriority);

            // ---------------- FIND CONFLICTS ----------------
            List<ResourceRequest> existingList =
                    resourceRepository.findByVenueAndDateAndStatusIn(
                            request.getVenue(),
                            date,
                            List.of("SUCCESS", "PENDING", "REPLACED")
                    );

            List<ResourceRequest> conflicts = new ArrayList<>();

            for (ResourceRequest old : existingList) {

                if (request.getId() != null &&
                        request.getId().equals(old.getId()))
                    continue;

                boolean overlap =
                        request.getStartPeriod() <= old.getEndPeriod() &&
                        request.getEndPeriod() >= old.getStartPeriod();

                if (overlap) {
                    conflicts.add(old);
                }
            }

            // ---------------- NO CONFLICT ----------------
            if (conflicts.isEmpty()) {

                request.setStatus("SUCCESS");
                request.setRejectionCount(0);

                resourceRepository.save(request);

                response.put("status", "SUCCESS");
                response.put("assignedVenue", request.getVenue());

                return response;
            }

            // ---------------- HANDLE CONFLICTS ----------------
            for (ResourceRequest old : conflicts) {

                int oldPriority = getEffectivePriority(old);

                if (newPriority > oldPriority) {

                    List<String> altVenues = getAvailableVenues(
                            date,
                            old.getStartPeriod(),
                            old.getEndPeriod()
                    );

                    // ---------------- REPLACE ----------------
                    if (!altVenues.isEmpty()) {

                        String newVenue = altVenues.get(0);

                        old.setVenue(newVenue);
                        old.setStatus("REPLACED");

                        old.setRejectionCount(
                                old.getRejectionCount() + 1
                        );

                        old.setEffectivePriority(
                                getEffectivePriority(old)
                        );

                        old.setReplacementReason(
                                "Moved due to higher priority "
                                        + request.getOccasion()
                                        + (request.getTitle() != null
                                        ? " (" + request.getTitle() + ")"
                                        : "")
                        );

                        resourceRepository.save(old);

                        // ---------------- EMAIL ----------------
                        if (old.getEmail() != null) {

                            mailService.sendMail(
                                    old.getEmail(),
                                    "Venue Changed - Smart Campus Booking",
                                    "Hello " + old.getName() + ",\n\n"
                                            + "Your booking for "
                                            + old.getTitle()
                                            + " has been moved to venue: "
                                            + newVenue
                                            + "\n\nReason: "
                                            + old.getReplacementReason()
                            );
                        }

                    } else {

                        // ---------------- REJECT ----------------
                        old.setStatus("REJECTED");

                        old.setRejectionCount(
                                old.getRejectionCount() + 1
                        );

                        old.setEffectivePriority(
                                getEffectivePriority(old)
                        );

                        old.setReplacementReason(
                                "Removed due to higher priority "
                                        + request.getOccasion()
                                        + (request.getTitle() != null
                                        ? " (" + request.getTitle() + ")"
                                        : "")
                        );

                        resourceRepository.save(old);

                        // ---------------- EMAIL ----------------
                        if (old.getEmail() != null) {

                            mailService.sendMail(
                                    old.getEmail(),
                                    "Booking Rejected - Smart Campus Booking",
                                    "Hello " + old.getName() + ",\n\n"
                                            + "Your booking for "
                                            + old.getTitle()
                                            + " has been rejected.\n\nReason: "
                                            + old.getReplacementReason()
                            );
                        }
                    }

                } else {

                    int updated = request.getRejectionCount() + 1;

                    request.setRejectionCount(updated);

                    request.setEffectivePriority(
                            getEffectivePriority(request)
                    );

                    request.setStatus("REJECTED");

                    request.setReplacementReason(
                            "Lower priority booking"
                    );

                    resourceRepository.save(request);

                    // ---------------- EMAIL ----------------
                    if (request.getEmail() != null) {

                        mailService.sendMail(
                                request.getEmail(),
                                "Booking Request Rejected",
                                "Hello " + request.getName() + ",\n\n"
                                        + "Your booking request for "
                                        + request.getTitle()
                                        + " was rejected.\n\nReason: Lower priority booking."
                        );
                    }

                    response.put("status", "REJECTED");
                    response.put("retry", updated);

                    return response;
                }
            }

            // ---------------- FINAL SUCCESS ----------------
            request.setStatus("SUCCESS");

            resourceRepository.save(request);

            response.put("status", "SUCCESS");
            response.put("assignedVenue", request.getVenue());

            return response;

        } catch (Exception e) {

            e.printStackTrace();

            response.put("status", "ERROR");
            response.put("message", e.getMessage());

            return response;
        }
    }

    // ---------------- VENUE STATUS ----------------
    public Map<String, Object> getVenueStatus(LocalDate date, int period) {

        List<ResourceRequest> approved =
                resourceRepository.findByDateAndStatusIn(
                        date,
                        List.of("SUCCESS", "REPLACED")
                );

        List<ResourceRequest> booked = approved.stream()
                .filter(r ->
                        period >= r.getStartPeriod() &&
                                period <= r.getEndPeriod()
                )
                .toList();

        Map<String, Object> result = new HashMap<>();

        result.put("booked", booked);

        return result;
    }

    // ---------------- APPROVE ----------------
    public ResourceRequest approveRequest(String id) {

        return resourceRepository.findById(id)
                .map(req -> {

                    req.setStatus("SUCCESS");
                    req.setRejectionReason(null);

                    return resourceRepository.save(req);

                }).orElseThrow(() ->
                        new RuntimeException("Request not found"));
    }

    // ---------------- REJECT ----------------
    public ResourceRequest rejectRequest(String id) {

        return resourceRepository.findById(id)
                .map(req -> {

                    req.setStatus("REJECTED");

                    req.setRejectionCount(
                            req.getRejectionCount() + 1
                    );

                    req.setRejectionReason(
                            "Rejected by admin"
                    );

                    return resourceRepository.save(req);

                }).orElseThrow(() ->
                        new RuntimeException("Request not found"));
    }

    // ---------------- GET ALL ----------------
    public List<ResourceRequest> getAllRequests() {
        return resourceRepository.findAll();
    }

    // ---------------- GET APPROVED ----------------
    public List<ResourceRequest> getApprovedResources() {

        return resourceRepository.findByStatusIn(
                List.of("SUCCESS", "REPLACED")
        );
    }
}