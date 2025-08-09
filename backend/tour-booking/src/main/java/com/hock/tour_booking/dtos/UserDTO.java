package com.hock.tour_booking.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
public class UserDTO {
    private UUID id;
    private String username;
    private String password;
    private String address;
    private String phone;
    private String email;
    private boolean isActive;
    private Set<RoleDTO> roles = new HashSet<>();
    private String cin;
    private Boolean is_ban;
}
