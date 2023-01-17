package com.ssafy.realcart.service.impl;

import com.ssafy.realcart.data.dao.IUserDAO;
import com.ssafy.realcart.data.dto.UserDto;
import com.ssafy.realcart.data.entity.User;
import com.ssafy.realcart.exception.NickNameShortException;
import com.ssafy.realcart.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {

    private IUserDAO userDAO;
    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(IUserDAO userDAO){
        this.userDAO = userDAO;
    }

    @Override
    public boolean createUser(UserDto userDto) throws NoSuchAlgorithmException {
        LOGGER.info("createUser 메서드가 userService에서 호출되었습니다.");
        User user = new User();
        try {
            user.setNickname(validateNickName(userDto.getNickname()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        byte[] salt = getSalt();
        user.setSalt(bytesToHex(salt));
        user.setIntro(userDto.getIntro());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword(sha256(userDto.getPassword(), salt));
        LOGGER.info(user.getPassword()); // TO-DO MySql에 Password 넣기 Data Too Long
        if(userDAO.createUser(user)){
            return true;
        }
        else{
            return false;
        }
    }

    private byte[] getSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private String validateNickName(String nickname) throws Exception {
        if(nickname.length() < 3){
            throw new NickNameShortException("닉네임 길이가 짧습니다.");
        }
        else{
            return nickname;
        }
    }

    private String sha256(String password, byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt);
        return bytesToHex(md.digest(password.getBytes()));
    }

    private String bytesToHex(byte[] digest) {
        StringBuilder builder = new StringBuilder();
        for (byte b : digest) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

    @Override
    public UserDto getUser(String email) {
        return null;
    }

    @Override
    public List<UserDto> getAllUsers() {
        LOGGER.info("getAllUsers 메서드가 userService에서 호출되었습니다.");
        List<UserDto> userDtoList = new ArrayList<UserDto>();
        List<User> userList = userDAO.getAllUsers();
        for (User user:
             userList) {
            UserDto userDto = new UserDto();
            userDto.setIntro(user.getIntro());
            userDto.setEmail(user.getEmail());
            userDto.setNickname(user.getNickname());
            userDtoList.add(userDto);
        }

        return userDtoList;
    }

    @Override
    public boolean updateUser(String email) {
        return false;
    }

    @Override
    public boolean deleteUser(String email) {
        return false;
    }

    @Override
    public boolean banUser(String email) {
        return false;
    }

    @Override
    public UserDto login(UserDto userDto) throws NoSuchAlgorithmException {
        LOGGER.info("로그인 메서드가 userService에서 호출되었습니다.");
        User user = userDAO.getUser(userDto.getEmail());
        // TO-DO: User가 isBan인 경우 BanList에 접근하여 Ban 지속 기간에 오늘이 포함되는지 확인할 것
        String tempPassword = sha256(userDto.getPassword(), user.getSalt().getBytes());
        if(user.getPassword().equals(tempPassword)){
            UserDto loginUser = new UserDto();
            loginUser.setIntro(user.getIntro());
            loginUser.setNickname(user.getNickname());
            loginUser.setUsername(user.getUsername());
            return loginUser;
        }
        else{
            return null;
        }
    }
}
