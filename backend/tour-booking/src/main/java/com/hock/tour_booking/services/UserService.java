package com.hock.tour_booking.services;

import com.hock.tour_booking.dtos.request.UserRequets;
import com.hock.tour_booking.entities.HostRegister;
import com.hock.tour_booking.entities.Role;
import com.hock.tour_booking.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    public User findUserById(UUID id)throws Exception;
    public User findUserProfileByJwt(String jwt)throws Exception;
    public User updateUser(User user)throws Exception;
    public User addUser(User user)throws Exception;
    public void addRoleForUser(UUID id, String roleName)throws Exception;
    public void updateHostRole(UUID userId, UUID roleId) throws Exception;
    public void changeUserPassword(UUID id, String oldPassword, String newPassword) throws Exception ;
    public User registerHost(User user)throws Exception;
    public User lockUserAccount(UUID userId) throws Exception ;
    public User unlockUserAccount(UUID userId) throws Exception ;
    public List<User> findAll()throws Exception;
    public User findUserByEmail(String email)throws Exception;
    public  User addHost(HostRegister hostRegister)throws  Exception;
    public List<User>findAllByRole(String role);
}
