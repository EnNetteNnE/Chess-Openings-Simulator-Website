package ru.nstu.EvaChess.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;

@Entity
@Table(name = "tokens")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    static final int TOKEN_LENGTH = 20;

    public Token(User user, String token){
        this.user = user;
        this.tokenString = token;
    }

    static public String generateToken(){
        String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz" ;
        String CHAR_UPPER = CHAR_LOWER.toUpperCase();
        String NUMBER = "0123456789";

        String allAlfavit = CHAR_LOWER + CHAR_UPPER + NUMBER;

        SecureRandom random = new SecureRandom();

        StringBuilder sb = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            int rndCharAt = random.nextInt(allAlfavit.length());
            char rndChar = allAlfavit.charAt(rndCharAt);

            sb.append(rndChar);
        }

        return sb.toString();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "token")
    private String tokenString;
}
