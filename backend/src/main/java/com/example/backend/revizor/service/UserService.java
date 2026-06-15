package com.example.backend.revizor.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.revizor.dto.SignupDto;
import com.example.backend.revizor.dto.UserDto;
import com.example.backend.revizor.entity.Users;
import com.example.backend.revizor.exception.InvalidCredentialsException;
import com.example.backend.revizor.exception.UserAlreadyExistsException;
import com.example.backend.revizor.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public Users createUser(SignupDto dto) {

        log.debug("Checking if email exists: {}", dto.getEmail());
        
        Users existingUser = userRepository.findByEmail(dto.getEmail());

        if (existingUser != null) {

            log.warn("Signup failed. Email already exists: {}", dto.getEmail());

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

        log.info("Creating new user: {}", dto.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);

    }

    public Users loginUser(UserDto userDto) {

        log.debug("Fetching user by email: {}", userDto.getEmail());

        Users user = userRepository.findByEmail(userDto.getEmail());

        if (user == null || !user.getPassword().equals(userDto.getPassword())) {

            log.warn("Invalid login attempt: {}", userDto.getEmail());

            throw new InvalidCredentialsException(
                    "Invalid email or password");
        }

        return user;

    }

}