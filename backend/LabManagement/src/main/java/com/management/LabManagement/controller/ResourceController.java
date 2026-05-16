package com.management.LabManagement.controller;

import com.management.LabManagement.model.ResourceRequest;
import com.management.LabManagement.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/resource")
@CrossOrigin
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/request")
    public Map<String, Object> createRequest(@RequestBody ResourceRequest request) {
        return resourceService.createRequest(request);
    }

    @GetMapping("/all")
    public List<ResourceRequest> getAllRequests() {
        return resourceService.getAllRequests();
    }

    @PutMapping("/approve/{id}")
    public ResourceRequest approveRequest(@PathVariable String id) {
        return resourceService.approveRequest(id);
    }

    @PutMapping("/reject/{id}")
    public ResourceRequest rejectRequest(@PathVariable String id) {
        return resourceService.rejectRequest(id);
    }

    @GetMapping("/approved")
    public List<ResourceRequest> getApprovedResources() {
        return resourceService.getApprovedResources();
    }

    @GetMapping("/status")
    public List<ResourceRequest> getAllResourceStatus() {
        return resourceService.getAllRequests();
    }

    @GetMapping("/venue-status")
    public Map<String, Object> getVenueStatus(
            @RequestParam String date,
            @RequestParam int period
    ) {
        return resourceService.getVenueStatus(
                LocalDate.parse(date),
                period
        );
    }
}