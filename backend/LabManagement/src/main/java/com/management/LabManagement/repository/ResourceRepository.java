package com.management.LabManagement.repository;

import com.management.LabManagement.model.ResourceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ResourceRepository
        extends MongoRepository<ResourceRequest, String> {

    List<ResourceRequest> findByStatus(String status);

    // ✅ ADD THIS
    List<ResourceRequest> findByStatusIn(List<String> status);

    List<ResourceRequest> findByVenueAndDate(String venue, LocalDate date);

    List<ResourceRequest> findByVenueAndDateAndStatusIn(
            String venue,
            LocalDate date,
            List<String> status
    );

    List<ResourceRequest> findByDateAndStatus(LocalDate date, String status);

    List<ResourceRequest> findByDateAndStatusIn(
            LocalDate date,
            List<String> status
    );

    // ✅ CRITICAL (AGING FIX)
    Optional<ResourceRequest> findFirstByNameAndDateAndStartPeriodAndEndPeriodOrderByRejectionCountDesc(
            String name,
            LocalDate date,
            int startPeriod,
            int endPeriod
    );
}