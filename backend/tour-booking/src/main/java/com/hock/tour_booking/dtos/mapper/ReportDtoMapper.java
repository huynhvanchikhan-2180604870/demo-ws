package com.hock.tour_booking.dtos.mapper;


import com.hock.tour_booking.dtos.ReportDTO;
import com.hock.tour_booking.entities.Report;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ReportDtoMapper {
    public static ReportDTO toReportDTO(Report report) {
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(report.getId());
        reportDTO.setUserId(report.getUserReport().getId());
        reportDTO.setTourId(report.getUserReport().getId());
        reportDTO.setDescriptionMismatch(report.isDescriptionMismatch());
        reportDTO.setScheduleMismatch(report.isScheduleMismatch());
        reportDTO.setOverpricing(report.isOverpricing());
        reportDTO.setGuideAttitude(report.isGuideAttitude());
        reportDTO.setGuideOther(report.isGuideOther());
        reportDTO.setOther(report.isOther());
        reportDTO.setOtherReason(report.getOtherReason());
        return reportDTO;
    }

    public static List<ReportDTO> toReportDTOs(List<Report> reports) {
        List<ReportDTO> reportDTOs = new ArrayList<>();
        for (Report report : reports) {
            ReportDTO reportDTO = toReportDTO(report);
            reportDTOs.add(reportDTO);
        }
        return reportDTOs;
    }
}
