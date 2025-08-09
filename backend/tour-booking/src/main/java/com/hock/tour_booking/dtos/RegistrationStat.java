package com.hock.tour_booking.dtos;

import lombok.Data;

@Data
public class RegistrationStat {
    private String period;
    private int registrations;

    public RegistrationStat(String period, int registrations) {
        this.period = period;
        this.registrations = registrations;
    }
}
