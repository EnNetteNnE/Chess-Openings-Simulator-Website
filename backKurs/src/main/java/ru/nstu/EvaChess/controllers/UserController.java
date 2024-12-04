package ru.nstu.EvaChess.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nstu.EvaChess.GlobalApplicationConstant;
import ru.nstu.EvaChess.controllers.dto.GetTokenRequest;
import ru.nstu.EvaChess.controllers.dto.UserCreateRequest;
import ru.nstu.EvaChess.models.Token;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.UserRepository;
import ru.nstu.EvaChess.services.UserService;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public ResponseEntity<User> createUser(@RequestBody UserCreateRequest userCreateRequest) {
        User user = userService.create(userCreateRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED); //TODO: Доделать плохой статус
    }

//    @GetMapping("/{id}")
//    @CrossOrigin(origins = "http://localhost:3000")
//    public User getUser(@PathVariable("id") long id){
//        return userService.getByToken("yedLISdDfIoPXfStESVv");
//    }


    @DeleteMapping("/token")
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public ResponseEntity getToken(@RequestHeader("token") String token){
        userService.deleteToken(token);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @PostMapping("/token")
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public String deleteToken(@RequestBody GetTokenRequest getTokenRequest){
        return userService.createToken(getTokenRequest);
    }

}
