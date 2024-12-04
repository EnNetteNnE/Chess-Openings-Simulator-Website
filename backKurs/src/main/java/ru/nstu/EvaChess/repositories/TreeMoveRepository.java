package ru.nstu.EvaChess.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nstu.EvaChess.models.TreeMove;
import ru.nstu.EvaChess.models.User;
import ru.nstu.EvaChess.repositories.sql_query.SqlQueryReader;

import java.util.List;

@Repository(value = "treeMoveRepository")
public interface TreeMoveRepository extends JpaRepository<TreeMove, Long> {
    @Query(value = SqlQueryReader.ALL_TREE_QUERY, nativeQuery = true)
    public List<TreeMove> getAllTree(long userId);
}
