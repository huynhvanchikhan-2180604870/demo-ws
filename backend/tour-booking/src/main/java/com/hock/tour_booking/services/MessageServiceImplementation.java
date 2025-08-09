package com.hock.tour_booking.services;

import com.hock.tour_booking.entities.ChatSession;
import com.hock.tour_booking.entities.Message;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.ChatSessionRepository;
import com.hock.tour_booking.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class MessageServiceImplementation implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatSessionRepository chatSessionRepository;
    @Autowired
    private UserService userService;

    @Override
    public Message saveMessage(Message message) {
        Message mss = new Message();
        mss.setId(UUID.randomUUID());
        mss.setChatSession(message.getChatSession());
        mss.setSender(message.getSender());
        mss.setReceiver(message.getReceiver());
        mss.setContent(message.getContent());
        mss.setSentAt(LocalDateTime.now());
        mss.setIsRead(false);
        return messageRepository.save(mss);
    }

    @Override
    public List<Message> getMessagesBySession(UUID sessionId) {
        ChatSession session = chatSessionRepository.findById(sessionId).orElseThrow(() -> new IllegalArgumentException("Invalid session ID"));
        return messageRepository.findByChatSession(session.getId());
    }

    @Override
    public ChatSession getSession(UUID sessionId) {
        return chatSessionRepository.findById(sessionId).orElseThrow(() -> new IllegalArgumentException("Invalid session ID"));
    }

    @Override
    public ChatSession createSession(ChatSession session) {
        session.setCreatedAt(LocalDateTime.now());
        session.setStatus("active");
        return chatSessionRepository.save(session);
    }

    @Override
    public ChatSession updateSessionStatus(UUID sessionId, String status) {
        ChatSession session = getSession(sessionId);
        session.setStatus(status);
        session.setUpdatedAt(LocalDateTime.now());
        return chatSessionRepository.save(session);
    }

    @Override
    public List<ChatSession> findAllSessionOfHost(UUID hostId) {
        return chatSessionRepository.findAllByHostId(hostId);
    }

    @Override
    public ChatSession findChatSessionById(UUID id) {
        return chatSessionRepository.findById(id).orElse(null);

    }

    @Override
    public ChatSession startSession(UUID hostId, UUID guestId) throws Exception {
        User host = userService.findUserById(hostId);
        User guest = userService.findUserById(guestId);
        ChatSession session = new ChatSession();
        session.setId(UUID.randomUUID());
        session.setCreatedAt(LocalDateTime.now());
        session.setUpdatedAt(LocalDateTime.now());
        session.setStatus("ACTIVE");

        // Save the new session to the database
        return chatSessionRepository.save(session);
    }
}
