package ru.nstu.EvaChess.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nstu.EvaChess.models.Token;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.sql_query.SqlQueryReader;

@Repository(value = "tokenRepository")
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query(value = SqlQueryReader.TOKEN_BY_STRING, nativeQuery = true)
    public Token getTokenByString(String token);
}
