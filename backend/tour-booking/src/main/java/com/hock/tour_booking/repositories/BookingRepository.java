package com.hock.tour_booking.repositories;

import com.hock.tour_booking.dtos.RevenueStatsDTO;
import com.hock.tour_booking.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    @Query("select b from Booking b where b.id =?1")
    public Booking findBookingById(UUID bookingId);

    @Query("select b from Booking b where b.user.id =?1")
    public List<Booking> findAllByUserId(UUID userId);

    @Query("SELECT b FROM Booking b JOIN b.tour t WHERE t.host.id = :hostId AND (:tourId IS NULL OR t.id = :tourId)")
    List<Booking> findBookingsByTourHostId(@Param("hostId") UUID hostId, @Param("tourId") UUID tourId);
    @Query("SELECT b FROM Booking b WHERE b.tour.id IN :tourIds AND b.bookingDate BETWEEN :start AND :end")
    List<Booking> findBookingsByTourIdsAndDateRange(@Param("tourIds") List<UUID> tourIds, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("select b from Booking b where b.tour.host.id = ?1")
    List<Booking> findBookingByHost(UUID hostId);
    @Query(value = "SELECT " +
            "  CASE " +
            "    WHEN DATE_FORMAT(b.booking_date, '%Y-%m-%d') = :timePeriod THEN 'Day' " +
            "    WHEN DATE_FORMAT(b.booking_date, '%Y-%m') = :timePeriod THEN 'Month' " +
            "    WHEN DATE_FORMAT(b.booking_date, '%Y-%m') BETWEEN DATE_FORMAT(:startDate, '%Y-%m') AND DATE_FORMAT(:endDate, '%Y-%m') THEN 'Quarter' " +
            "    ELSE 'Year' " +
            "  END AS timePeriod, " +
            "  SUM(b.final_price) AS totalRevenue, " +
            "  COUNT(b.id) AS totalBookings " +
            "FROM bookings b " +
            "WHERE b.booking_date BETWEEN :startDate AND :endDate " +
            "GROUP BY timePeriod", nativeQuery = true)
    List<RevenueStatsDTO> findRevenueStatsByTimePeriod(
            @Param("timePeriod") String timePeriod,
            @Param("startDate") ZonedDateTime startDate,
            @Param("endDate") ZonedDateTime endDate);
}
