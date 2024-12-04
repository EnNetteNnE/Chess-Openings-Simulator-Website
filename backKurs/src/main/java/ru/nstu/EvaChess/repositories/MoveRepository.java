package ru.nstu.EvaChess.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nstu.EvaChess.models.Move;
import ru.nstu.EvaChess.models.Token;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.sql_query.SqlQueryReader;

import java.util.List;

@Repository(value = "moveRepository")
public interface MoveRepository extends JpaRepository<Move, Long> {

    @Query(value = SqlQueryReader.NULL_MOVE_QUERY, nativeQuery = true)
    public Move getNullMove(long treeId);

    @Query(value = SqlQueryReader.ALL_NEXT_MOVES_QUERY, nativeQuery = true)
    public List<Move> getAllNextMoves(long moveId);
}
