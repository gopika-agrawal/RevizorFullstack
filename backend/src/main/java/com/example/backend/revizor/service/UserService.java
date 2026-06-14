package com.example.backend.revizor.service;

import org.springframework.stereotype.Service;

import com.example.backend.revizor.dto.SignupDto;
import com.example.backend.revizor.dto.UserDto;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.exception.InvalidCredentialsException;
import com.example.backend.revizor.exception.UserAlreadyExistsException;
import com.example.backend.revizor.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Users createUser(SignupDto dto) {
        
        Users existingUser = userRepository.findByEmail(dto.getEmail());

        if (existingUser != null) {

            throw new UserAlreadyExistsException(
                    "Email already registered");
        }

        Users user = Users.builder()
                        .firstName(dto.getFirstName())
                        .lastName(dto.getLastName())
                        .email(dto.getEmail())
                        .password(dto.getPassword())
                        .university(dto.getUniversity())
                        .build();

        return userRepository.save(user);

    }

    public Users loginUser(UserDto userDto) {

        Users user = userRepository.findByEmail(userDto.getEmail());

        if (user == null || !user.getPassword().equals(userDto.getPassword())) {

            throw new InvalidCredentialsException(
                    "Invalid email or password");
        }

        return user;

    }

}