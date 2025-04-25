package com.project.renew.service.Impl;

import com.project.renew.DTO.LogInDto;
import com.project.renew.DTO.SignUPDto;
import com.project.renew.model.Governorate;
import com.project.renew.model.User;
import com.project.renew.repo.GovernorateRepo;
import com.project.renew.repo.UserRepository;
import com.project.renew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


// the class of the service interface
@Service
public class UserImpl implements UserService {
    @Autowired
    GovernorateRepo govRepo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    PasswordEncoder encoder;

    public String signup(SignUPDto dto) {
        Governorate gov = govRepo.findByName(dto.getGovernorate())
                .orElseThrow(() -> new RuntimeException("Gov not found"));
        User u = new User();
        u.setGovernorate(gov);
        u.setName(dto.getName());
        u.setEmail(dto.getEmail());
        u.setPassword(encoder.encode(dto.getPassword()));
        u.setPhone(dto.getPhone());
        userRepo.save(u);
        return "ok";
    }

    public boolean login(LogInDto dto) {
        User u = userRepo.findByEmail(dto.getEmail()).orElse(null);
        return u != null && encoder.matches(dto.getPassword(), u.getPassword());
    }

}


