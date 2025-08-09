package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.ReportDTO;
import com.hock.tour_booking.dtos.mapper.ReportDtoMapper;
import com.hock.tour_booking.dtos.request.ReportRequest;
import com.hock.tour_booking.entities.Report;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.EmailService;
import com.hock.tour_booking.services.ReportService;
import com.hock.tour_booking.services.TourService;
import com.hock.tour_booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/create")
    public ResponseEntity<?> createReport(@RequestHeader("Authorization") String jwt, @RequestBody ReportRequest reportRequest) throws Exception {
        System.out.println("JWT Received: " + jwt);
        User user = userService.findUserProfileByJwt(jwt);
        System.out.println("User report: " + user.getUsername());
        System.out.println("Report data client send to server: " + reportRequest.toString());
        if(user == null) {
            throw new Exception("Invalid JWT");
        }
        Tour tour = tourService.findTourById(reportRequest.getTourId());
        if(tour == null) {
            throw new Exception("Invalid tour");
        }

        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setUserId(user.getId());
        reportDTO.setTourId(tour.getId());
        reportDTO.setDescriptionMismatch(reportRequest.isDescriptionMismatch());
        reportDTO.setScheduleMismatch(reportRequest.isScheduleMismatch());
        reportDTO.setOverpricing(reportRequest.isOverpricing());
        reportDTO.setGuideAttitude(reportRequest.isGuideAttitude());
        reportDTO.setGuideOther(reportRequest.isGuideOther());
        reportDTO.setOther(reportRequest.isOther());
        reportDTO.setOtherReason(reportRequest.getOtherReason());
        Report createReport = reportService.createReport(reportDTO);
        emailService.sendEmailReportToUser(user.getEmail(), createReport);
        ReportDTO createReportDTO = ReportDtoMapper.toReportDTO(createReport);
        return ResponseEntity.ok(createReportDTO);
    }
}
