package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.BookingDTO;
import com.hock.tour_booking.entities.Booking;

import java.util.ArrayList;
import java.util.List;

public class BookingDtoMapper {

    public static BookingDTO toBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setUser(booking.getUser().getId());
        bookingDTO.setTour(booking.getTour().getId());
        bookingDTO.setNumPeople(booking.getNumPeople());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setPromotion(null);
        bookingDTO.setDiscountAmount(booking.getDiscountAmount());
        bookingDTO.setFinalPrice(booking.getFinalPrice());
        bookingDTO.setPaymentStatus(booking.getPaymentStatus());
        bookingDTO.setBookingStatus(booking.getBookingStatus());
        bookingDTO.setPaymentMethod(booking.getPaymentMethod());
        bookingDTO.setCreatedAt(booking.getCreatedAt());
        bookingDTO.setUpdatedAt(booking.getUpdatedAt());
        bookingDTO.setQrBase64(booking.getQrBase64());
        bookingDTO.setFullname(booking.getUser().getUsername());
        bookingDTO.setTourname(booking.getTour().getTitle());
        return bookingDTO;
    }

    public static List<BookingDTO> toBookingDTOs(List<Booking> bookings) {
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        for(Booking booking : bookings) {
            BookingDTO bookingDTO = toBookingDTO(booking);
            bookingDTOS.add(bookingDTO);
        }
        return bookingDTOS;
    }
}
