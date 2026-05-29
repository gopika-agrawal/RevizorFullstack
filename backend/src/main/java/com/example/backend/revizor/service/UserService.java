package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserRepository userRepository;

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public Users createUser(Users user){
        Users newUser = userRepository.save(user);
        return newUser;
    }

}