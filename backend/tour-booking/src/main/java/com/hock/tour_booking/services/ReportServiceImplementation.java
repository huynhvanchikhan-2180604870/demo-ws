package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.ReportDTO;
import com.hock.tour_booking.entities.Report;
import com.hock.tour_booking.entities.Tour;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ReportServiceImplementation implements ReportService {

    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TourService tourService;

    @Override
    public Report createReport(ReportDTO request) throws Exception {
        if (request.getUserId() == null) {
            throw new Exception("User ID is required");
        }
        if (request.getTourId() == null) {
            throw new Exception("Tour ID is required");
        }

        User user = userService.findUserById(request.getUserId());
        if (user == null) {
            throw new Exception("User not found");
        }

        Tour tour = tourService.findTourById(request.getTourId());
        if (tour == null) {
            throw new Exception("Tour not found");
        }

        Report report = new Report();
        report.setId(UUID.randomUUID());
        report.setUserReport(user);
        report.setTourReport(tour);
        report.setDescriptionMismatch(request.isDescriptionMismatch());
        report.setScheduleMismatch(request.isScheduleMismatch());
        report.setOverpricing(request.isOverpricing());
        report.setGuideAttitude(request.isGuideAttitude());
        report.setGuideOther(request.isGuideOther());
        report.setOther(request.isOther());
        report.setOtherReason(request.getOtherReason());

        return reportRepository.save(report);
    }


    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @Override
    public Report getReportById(UUID id) {
        return reportRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteReport(UUID id) {
        Report report = reportRepository.findById(id).orElse(null);
        if (report != null) {
            reportRepository.delete(report);
        }
    }
}
