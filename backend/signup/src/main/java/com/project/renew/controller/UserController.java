package com.project.renew.controller;


import com.project.renew.DTO.LogInDto;
import com.project.renew.DTO.SignUPDto;
import com.project.renew.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

//handling incoming requests
@CrossOrigin(origins = "http://127.0.0.1:5500") // gonna change it when i get the frontend api port
    @RestController
    @RequestMapping("/api/users")   // http://localhost:8080/api/users/signup and  http://localhost:8080/api/users/signin
    public class UserController {

        private final UserService userService;

        @Autowired
        public UserController(UserService userService) {
            this.userService = userService;
        }

        /*
         Sign up a new user.
         Expects JSON:
         {
         "name": "...",
         "email": "...",  (a unique one)
         "password": "...", (gonna be encrypted in the db)
         "phone": "...",
         "governorateName": "...",
          }
         */
        @PostMapping("/signup")
        public ResponseEntity<?> signup(@RequestBody SignUPDto dto) {
            try {
                userService.signup(dto);
                return ResponseEntity.ok().body(Map.of("message","Success"));
            } catch (DataIntegrityViolationException ex) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of("message","That email is already registered."));
            }
        }


    /*
         Log in an existing user.
         Expects JSON:
         {
         "email": "...",  must be exist
         "password": "..."
         }
         */
    @PostMapping("/signin")
    public ResponseEntity<Map<String,String>> login(@RequestBody LogInDto dto) {
        boolean ok = userService.login(dto);
        if (ok) {
            return ResponseEntity
                    .ok(Map.of("message","Login successful"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message","Invalid email or password"));
        }
    }

}








