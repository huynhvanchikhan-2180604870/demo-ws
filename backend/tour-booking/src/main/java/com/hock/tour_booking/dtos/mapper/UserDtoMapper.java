package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.RoleDTO;
import com.hock.tour_booking.dtos.UserDTO;
import com.hock.tour_booking.entities.Role;
import com.hock.tour_booking.entities.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

public class UserDtoMapper {
    public static UserDTO toUserDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setActive(user.getIs_active());
        userDTO.setPhone(user.getPhone_number());
        userDTO.setUsername(user.getUsername());
        userDTO.setRoles(setRoleUserToRoleUserDTO(user));
        userDTO.setCin(user.getCin());
        userDTO.setIs_ban(user.getIs_ban());
        return userDTO;
    }

    public static List<UserDTO> toUserDtos(List<User> users) {
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            userDTOs.add(toUserDto(user));
        }
        return userDTOs;
    }

    public static HashSet<RoleDTO> setRoleUserToRoleUserDTO(User user) {
        HashSet<RoleDTO> roleDTOSet = new HashSet<>();
        for (Role role : user.getRoles()) {
            RoleDTO roleDTO = RoleDtoMapper.toRoleDTO(role);
            roleDTOSet.add(roleDTO);
        }
        return roleDTOSet;
    }
}
