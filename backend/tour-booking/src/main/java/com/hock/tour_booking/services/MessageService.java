package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.ChatSession;
import com.hock.tour_booking.entities.Message;

import java.util.List;
import java.util.UUID;

public interface MessageService {
    public Message saveMessage(Message message);
    public List<Message> getMessagesBySession(UUID sessionId);
    public ChatSession getSession(UUID sessionId);
    public ChatSession createSession(ChatSession session);
    public ChatSession updateSessionStatus(UUID sessionId, String status);
    public List<ChatSession> findAllSessionOfHost(UUID hostId);
    public ChatSession findChatSessionById(UUID id);
    public ChatSession startSession(UUID hostId, UUID guestId) throws Exception;
}
