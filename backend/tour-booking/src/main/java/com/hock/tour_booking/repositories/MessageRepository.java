package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.ChatSession;
import com.hock.tour_booking.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    @Query("SELECT m from Message m where m.chatSession.id =?1")
    List<Message> findByChatSession(UUID sessionId);
}
