package com.hock.tour_booking.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "chat_session")
public class ChatSession {
    @Id
    private UUID id;

    @OneToMany(mappedBy = "chatSession")
    @JsonManagedReference
    private List<Message> messages;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "status")
    private String status;

    @ManyToOne  // Assuming each session has one host and many sessions can have the same host
    @JoinColumn(name = "host_id") // Correct column name to match the foreign key in the database
    private User host;

    @ManyToOne  // Assuming each session is created by one user and a user can create many sessions
    @JoinColumn(name = "created_by_id") // Correct column name to match the foreign key in the database
    private User createBy;

}
