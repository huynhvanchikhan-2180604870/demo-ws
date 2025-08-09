package com.hock.tour_booking.dtos.mapper;

import com.hock.tour_booking.dtos.DestinationDTO;
import com.hock.tour_booking.entities.Destination;

import java.util.ArrayList;
import java.util.List;

public class DestinationDtoMapper {
    public static DestinationDTO toDestinationDto(Destination destination) {
        DestinationDTO destinationDto = new DestinationDTO();
        destinationDto.setId(destination.getId());
        destinationDto.setName(destination.getName());
        destinationDto.setTourCount(destination.getTourCount());
        destinationDto.setUrl(destination.getUrl());
        return destinationDto;
    }

    public static List<DestinationDTO> toDestinationDtos(List<Destination> destinations) {
        List<DestinationDTO> destinationDtos = new ArrayList<DestinationDTO>();
        for (Destination destination : destinations) {
            DestinationDTO destinationDto = toDestinationDto(destination);
            destinationDtos.add(destinationDto);
        }
        return destinationDtos;
    }
}
