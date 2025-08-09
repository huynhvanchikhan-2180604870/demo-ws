package com.hock.tour_booking.dtos.request;

import com.hock.tour_booking.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequets {
    public String email;

    public String username;

    public String password;

    public String phone_number;

    public String address;

    public String cin;


    public Set<Role> roles = new HashSet<>();

}
