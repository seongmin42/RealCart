package com.ssafy.realcart.controller;

import com.ssafy.realcart.data.dto.UserDto;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.data.repository.IUserRepository;
import com.ssafy.realcart.service.IUserService;
import com.ssafy.realcart.service.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private IUserRepository userRepository;

    private IUserService userService = null;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);


    @Autowired
    public UserController(IUserService userService){
        this.userService = userService;
    }
    @GetMapping()
    public ResponseEntity<List<UserDto>> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userController에서 호출되었습니다.");
        List<UserDto> userList = userService.getAllUsers();
        return new ResponseEntity<List<UserDto>>(userList, HttpStatus.OK);
    }

    @PostMapping(value="/register")
    public ResponseEntity createUser(UserDto userDto){
        LOGGER.info("createUser 메서드가 userController에서 호출되었습니다.");
        try {
            if(userService.createUser(userDto)){
                return new ResponseEntity<>(userDto, HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping()
    public ResponseEntity login(UserDto userDto){
        LOGGER.info("Login 메서드가 userController에서 호출되었습니다.");
        try {
            UserDto loginUser = userService.login(userDto);
            if(loginUser != null){
                return new ResponseEntity<>(loginUser, HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
