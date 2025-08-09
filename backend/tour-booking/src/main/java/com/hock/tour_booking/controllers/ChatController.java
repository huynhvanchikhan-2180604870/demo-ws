package com.hock.tour_booking.controllers;

import com.hock.tour_booking.dtos.MessageDTO;
import com.hock.tour_booking.dtos.mapper.MessageDtoMapper;
import com.hock.tour_booking.entities.ChatSession;
import com.hock.tour_booking.entities.Message;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.services.MessageService;
import com.hock.tour_booking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/chats")
public class ChatController {
    @Autowired
    private MessageService chatService;
    @Autowired
    private UserService userService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDTO message) {
        try {
            ChatSession session = chatService.findChatSessionById(message.getChatSession());
            if (session == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\":\"Session not found\"}");
            }
            User sender = userService.findUserById(message.getSenderId());
            User receiver = userService.findUserById(message.getReceiverId());

            Message mss = new Message();
            mss.setChatSession(session);
            mss.setSender(sender);
            mss.setReceiver(receiver);
            mss.setContent(message.getContent());
            mss.setSentAt(LocalDateTime.now());
            mss.setIsRead(false);

            Message savedMessage = chatService.saveMessage(mss);
            // Gửi qua WebSocket tới topic dùng chung cho tất cả người dùng trong session
            messagingTemplate.convertAndSend(String.format("/topic/messages/%s", session.getId()), savedMessage);

            return new ResponseEntity<>(savedMessage, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\""+e.getMessage()+"\"}");
        }
    }

    @GetMapping("/sessions/{sessionId}/messages")
    public List<Message> listMessagesBySession(@PathVariable UUID sessionId) {
        return chatService.getMessagesBySession(sessionId);
    }

    @PostMapping("/sessions/{id}")
    public ResponseEntity<?> createSession(@RequestHeader("Authorization") String jwt,@PathVariable UUID id) throws Exception {
        User userHost = userService.findUserById(id);
        User userCreate = userService.findUserProfileByJwt(jwt);
        if (userCreate == null){
            return new ResponseEntity<>("not Login", HttpStatus.FORBIDDEN);
        }

        ChatSession ss = new ChatSession();
        ss.setId(UUID.randomUUID());
        ss.setMessages(new ArrayList<>());
        ss.setHost(userHost);
        ss.setCreateBy(userCreate);
        ChatSession save = chatService.createSession(ss);
        return new ResponseEntity<>(save, HttpStatus.OK);
    }

    @PutMapping("/sessions/{id}/status")
    public ChatSession updateSessionStatus(@PathVariable UUID id, @RequestBody String status) {
        return chatService.updateSessionStatus(id, status);
    }

    @GetMapping("/sessions")
    public ResponseEntity<?> findAllSession(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        if(!user.getRoles().stream().anyMatch(role -> "ROLE_HOST".equals(role.getName()))) {
            return new ResponseEntity<>("Forbidden", HttpStatus.FORBIDDEN);
        }
        List<ChatSession> chatSessions = chatService.findAllSessionOfHost(user.getId());
        return new ResponseEntity<>(chatSessions, HttpStatus.OK);
    }
}
