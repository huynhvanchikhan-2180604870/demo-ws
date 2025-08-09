package com.hock.tour_booking.config;
import com.hock.tour_booking.entities.Role;
import com.hock.tour_booking.entities.User;
import com.hock.tour_booking.repositories.RoleCustomRepo;
import com.hock.tour_booking.repositories.RoleRepository;
import com.hock.tour_booking.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtProvider {
    @Autowired
    private  UserRepository userRepository;
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET.getBytes());

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleCustomRepo roleCustomRepo;
    public JwtProvider(UserRepository userRepository) {
    }

    public String generateToken(Authentication authentication) {
        String emailreq =(String) authentication.getPrincipal(); // Cast to your User class
        User user = userRepository.findByEmail(emailreq);

//        List<String> roles = user.getRoles().stream()
//                .map(Role::getName)
//                .collect(Collectors.toList());

        List<String> roles = null;
        List<Role> roleList = new ArrayList<>();
        if(user!= null){
            roles = roleCustomRepo.getAllRoles(user);
            roles.forEach(role -> {
                Role r = roleRepository.findByName(role);
                roleList.add(r);
            });
        }

        List<String> roleOfUser = roleList.stream().map(Role::getName).collect(Collectors.toList());

        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000)) // 1 day expiration
                .claim("email", authentication.getName())
                .claim("roles", roleOfUser) // Add roles to the token
                .signWith(key)
                .compact();
        return jwt;
    }

    public String getEmailFromToken(String token) {
        token = token.substring(7);
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody();
        String email = String.valueOf(claims.get("email"));
        return email;
    }
}
