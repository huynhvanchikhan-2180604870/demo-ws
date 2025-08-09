package com.hock.tour_booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User{
    @Id
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String password_hash;

    @Column(name = "phone_number", unique = true)
    private String phone_number;

    private String cin;

    private String address;

    @ManyToMany
    @JoinTable(name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    @JsonIgnore
    private Set<Role> roles = new HashSet<>();

    @Column(name = "is_active")
    private Boolean is_active;

    @Column(name = "last_login")
    private LocalDateTime last_login;

    @Column(name = "verify_code")
    private String verify_code;
    @Column(name = "is_ban")
    private Boolean is_ban;
    @ManyToMany
    @JoinTable(name = "user_favorites",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="tour_id"))
    @JsonIgnore
    private Set<Tour> favoriteTours = new HashSet<>();
    @Override
    public String toString() {
        return "User {" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", roles=" + roles.stream().map(Role::getName).collect(Collectors.toSet()) + // Chỉ in ra tên vai trò
                '}';
    }
}
