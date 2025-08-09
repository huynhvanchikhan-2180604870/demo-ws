package com.hock.tour_booking.dtos.mapper;


import com.hock.tour_booking.dtos.MessageDTO;
import com.hock.tour_booking.entities.Message;

import java.util.ArrayList;
import java.util.List;

public class MessageDtoMapper {
    public static MessageDTO toMessageDTO(Message message){
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setContent(message.getContent());
        dto.setChatSession(message.getChatSession().getHost().getId());
        dto.setIsRead(message.getIsRead());
        dto.setSenderId(message.getSender().getId());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setSentAt(message.getSentAt());
        return dto;
    }

    public static List<MessageDTO> toMessageDtos(List<Message> messages){
        List<MessageDTO> dtos = new ArrayList<>();
        for (Message mes : messages){
            MessageDTO dto = toMessageDTO(mes);
            dtos.add(dto);
        }
        return dtos;
    }
}
