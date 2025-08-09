package com.hock.tour_booking.dtos.mapper;

import java.util.ArrayList;
import java.util.List;

import com.hock.tour_booking.dtos.HostRegisterDTO;
import com.hock.tour_booking.entities.HostRegister;

public class HostRegisterDtoMapper {
    public static HostRegisterDTO toHostRegister(HostRegister requets){
        HostRegisterDTO convert = new HostRegisterDTO();
        convert.setId(requets.getId());
        convert.setEmail(requets.getEmail());
        convert.setAddress(requets.getAddress());
        convert.setCin(requets.getCin());
        convert.setPhoneNumber(requets.getPhoneNumber());
        convert.setUsername(requets.getUsername());
        convert.setActive(requets.getActive());
        return convert;
    }

    public static List<HostRegisterDTO> toHostRegisters(List<HostRegister> requests){
        List<HostRegisterDTO> converts = new ArrayList<>();
        for(HostRegister host : requests){
            HostRegisterDTO convert = toHostRegister(host);
            converts.add(convert);
        }
        return converts;
    }
}
