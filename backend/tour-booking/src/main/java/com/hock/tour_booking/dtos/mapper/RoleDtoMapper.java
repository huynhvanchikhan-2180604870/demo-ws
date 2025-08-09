package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.RoleDTO;
import com.hock.tour_booking.entities.Role;

import java.util.ArrayList;
import java.util.List;

public class RoleDtoMapper {
    public static RoleDTO toRoleDTO(Role role){
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        return roleDTO;
    }

    public static List<RoleDTO> toRoleDTOs(List<Role> roles){
        List<RoleDTO> roleDTOs = new ArrayList<RoleDTO>();
        for(Role role : roles){
            RoleDTO r = toRoleDTO(role);
            roleDTOs.add(r);
        }
        return roleDTOs;
    }
}
