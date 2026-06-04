package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.example.backend.revizor.dto.UserDto;
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

    public Users loginUser(UserDto userDto){
        
        Users user = userRepository.findByEmail(userDto.getEmail());

        if(user != null && user.getPassword().equals(userDto.getPassword())){
            return user;
        }
        
        return null;

    }



    //     public String loginUser(UserDto userDto){

    //     Users user = userRepository.findByEmail(userDto.getEmail());

    //     System.out.println("User found: " + user);

    //     if(user == null){
    //         System.out.println("User is null");
    //         return "Invalid email or password";
    //     }

    //     System.out.println("DB Password = " + user.getPassword());
    //     System.out.println("Entered Password = " + userDto.getPassword());

    //     boolean match = user.getPassword().equals(userDto.getPassword());

    //     System.out.println("Password Match = " + match);

    //     if(match){
    //         System.out.println("Inside Success Block");
    //         return user.getId().toString();
    //     }

    //     return "Invalid email or password";
    // }
}