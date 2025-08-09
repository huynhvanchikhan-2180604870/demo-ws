package com.hock.tour_booking.dtos;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
@Data
public class RoleDTO {
    private UUID id;
    private String name;
    private Set<UserDTO> users = new HashSet<UserDTO>();
}
