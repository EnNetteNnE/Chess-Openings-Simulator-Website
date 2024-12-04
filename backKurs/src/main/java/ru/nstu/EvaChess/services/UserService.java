package ru.nstu.EvaChess.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.util.StringUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import ru.nstu.EvaChess.controllers.dto.GetTokenRequest;
import ru.nstu.EvaChess.controllers.dto.UserCreateRequest;
import ru.nstu.EvaChess.models.Token;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.TokenRepository;
import ru.nstu.EvaChess.repositories.UserRepository;

import java.io.Console;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service(value = "userService")
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    public User create(UserCreateRequest userInfo){
        User newUser = new User(userInfo.login(), userInfo.password());

        try {
            User user = userRepository.getUserByLogin(userInfo.login());
            if(user == null)
            {
                userRepository.save(newUser); //TODO: Доделать уникальность пользователей
                return newUser;
            }
           else return new User();
        }
        catch (Exception ex){
            log.info(ex.toString());
            return new User();
        }
    }

    public User get(long id){
        try{
            User user = userRepository.findById(id).get();
            return user;
        }
        catch (Exception ex)
        {
            return new User();
        }
    }

    public User getByToken(String token){
        return tokenRepository.getTokenByString(token).getUser();
    }

    public String createToken(GetTokenRequest getTokenRequest) {

        User user = userRepository.getUserByLogin(getTokenRequest.login());

        if(user != null){
            if(user.getPassword().equals(getTokenRequest.password())){
                Token token = new Token(user, Token.generateToken());
                return tokenRepository.save(token).getTokenString();
            } else {
                return "0";
            }
        } else {
            return "0";
        }

    }

    public void deleteToken(String token){
        tokenRepository.delete(tokenRepository.getTokenByString(token));
    }
}
