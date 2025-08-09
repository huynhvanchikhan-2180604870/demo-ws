package com.hock.tour_booking.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.hock.tour_booking.entities.ChatSession;
import com.hock.tour_booking.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Component
public class ChatSessionDeserializer extends JsonDeserializer<ChatSession> {

    @Autowired
    private MessageService messageService;

    public ChatSessionDeserializer() {
        super();
    }

    @Override
    public ChatSession deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        String uuidString = jp.getText();
        UUID id = UUID.fromString(uuidString);
        return messageService.findChatSessionById(id);
    }
}
