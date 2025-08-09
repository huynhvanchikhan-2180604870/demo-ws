package com.hock.tour_booking.entities;

import lombok.*;
import jakarta.persistence.*;
import java.util.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "host_registers")
public class HostRegister{
    @Id
    private UUID id;
    private String username;
    private String cin;
    private String email;
    private String password;
    private String address;
    @Column(name = "phone_number")
    private String phoneNumber;
    private String active;
}