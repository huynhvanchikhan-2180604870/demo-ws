package com.hock.tour_booking.repositories;

import com.hock.tour_booking.entities.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, UUID> {
    @Query("select c from ChatSession c where c.host.id =?1")
    public List<ChatSession> findAllByHostId(UUID hostId);
}
