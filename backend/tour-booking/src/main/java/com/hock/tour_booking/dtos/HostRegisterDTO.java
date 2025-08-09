package com.hock.tour_booking.dtos;

import java.util.UUID;

import lombok.Data;

@Data
public class HostRegisterDTO {
    private UUID id;
    private String username;
    private String cin;
    private String email;
    private String password;
    private String address;
    private String phoneNumber;
    private String active;
}