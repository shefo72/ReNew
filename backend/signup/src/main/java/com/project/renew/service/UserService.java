package com.project.renew.service;

import com.project.renew.DTO.LogInDto;
import com.project.renew.DTO.SignUPDto;

//includes the methods used in the controller
public interface UserService {

    String signup(SignUPDto dto);
    boolean login(LogInDto dto);

}
