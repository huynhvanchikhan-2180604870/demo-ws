package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.ReportDTO;
import com.hock.tour_booking.entities.Report;

import java.util.List;
import java.util.UUID;

public interface ReportService {
    Report createReport(ReportDTO request) throws Exception;
    List<Report> getAllReports();
    Report getReportById(UUID id);
    void deleteReport(UUID id);
}
