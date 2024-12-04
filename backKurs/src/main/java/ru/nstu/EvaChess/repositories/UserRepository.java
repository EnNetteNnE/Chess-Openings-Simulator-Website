package ru.nstu.EvaChess.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.sql_query.SqlQueryReader;

import java.time.LocalDateTime;

@Repository(value = "userRepository")
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = SqlQueryReader.USER_BY_LOGIN, nativeQuery = true)
    public User getUserByLogin(String login);



}
