package com.hock.tour_booking.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hock.tour_booking.entities.HostRegister;
import com.hock.tour_booking.repositories.HostRegisterRepository;

@Service
public class HostRegisterServiceImplementation implements HostRegisterService{
    @Autowired
    private HostRegisterRepository hostRegisterRepository;

    @Override
    public HostRegister register (HostRegister request){
        HostRegister newHost = new HostRegister();
        newHost.setId(UUID.randomUUID());
        newHost.setAddress(request.getAddress());
        newHost.setCin(request.getCin());
        newHost.setEmail(request.getEmail());
        newHost.setPhoneNumber(request.getPhoneNumber());
        newHost.setPassword(request.getPassword());
        newHost.setUsername(request.getUsername());
        newHost.setActive("Pending");
        HostRegister save = hostRegisterRepository.save(newHost);
        return save;
    }

    @Override
    public HostRegister checkExist(String email){
        HostRegister host = hostRegisterRepository.findByEmail(email);
        if(host == null){
            return null;
        }
        return host;
    }

    @Override
    public List<HostRegister> findAll(){
        return hostRegisterRepository.findAll();
    }

    @Override
    public HostRegister findById(UUID id){
        return hostRegisterRepository.findById(id).orElseThrow();
    }

    @Override
    public void updateStatus(String status){
//        HostRegister hostRegister
    }
}
