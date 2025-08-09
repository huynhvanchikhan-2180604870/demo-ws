package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.dtos.RegistrationStat;
import com.hock.tour_booking.dtos.RevenueStatsDTO;
import com.hock.tour_booking.dtos.response.OrderTrackingResponse;
import com.hock.tour_booking.entities.Booking;
import com.hock.tour_booking.exception.BookingException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface BookingService {
    public Booking createBooking(Booking booking) throws Exception;
    public Booking findBookingById(UUID id) throws BookingException;
    public void cancelBooking(UUID id)throws BookingException;
    public Booking updateBooking(BookingDTO booking)throws BookingException;
    public List<Booking> findAllBookings();
    public List<Booking> findAllBookingsByUserId(UUID userId);
    public Map<String, List<RegistrationStat>> calculateHostStats(UUID hostId, String period, String startDate, String endDate, UUID tourId);
    public Map<String, Integer> calculateRevenueStatsByHostAndMonth(UUID hostId, LocalDate startOfMonth, LocalDate endOfMonth);
    // public 
    public List<OrderTrackingResponse> getOrderTracking(UUID hostId) throws Exception;
    public List<RevenueStatsDTO> getRevenueStats(String timePeriod, ZonedDateTime startDate, ZonedDateTime endDate);
}
