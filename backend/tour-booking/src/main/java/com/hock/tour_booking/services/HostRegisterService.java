package com.hock.tour_booking.services;


import com.hock.tour_booking.entities.HostRegister;
import com.hock.tour_booking.entities.User;

import java.util.List;
import java.util.UUID;

public interface HostRegisterService {
    public HostRegister register(HostRegister request);
    public HostRegister checkExist(String email);
    public List<HostRegister> findAll();
    public HostRegister findById(UUID id);
    public void updateStatus(String status);
}
