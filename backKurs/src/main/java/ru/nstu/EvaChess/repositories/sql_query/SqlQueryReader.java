package ru.nstu.EvaChess.repositories.sql_query;

import java.io.BufferedReader;
import java.io.FileReader;

public class SqlQueryReader {

    static final String sqlPath = "C:\\Users\\Степан\\IdeaProjects\\EvaChess\\src\\main\\java\\ru\\nstu\\EvaChess\\repositories\\sql_query\\";

    public static final String NULL_MOVE_QUERY = "SELECT * FROM moves WHERE ?1 = moves.tree_id AND moves.number = 0 LIMIT 1";
    public static final String ALL_NEXT_MOVES_QUERY = "SELECT * FROM moves WHERE moves.prevent_move = ?1";
    public static final String ALL_TREE_QUERY = "SELECT * FROM tree_moves WHERE tree_moves.user_id = ?1";
    public static final String TOKEN_BY_STRING = "SELECT * FROM tokens WHERE tokens.token = ?1 LIMIT 1";
    public static final String USER_BY_LOGIN = "SELECT * FROM users WHERE users.login = ?1 LIMIT 1";


    static public String readSqlQuery(String nameSqlQuery){

        try{
            BufferedReader reader = new BufferedReader(
                    new FileReader(sqlPath + nameSqlQuery + ".sql"));
            String line;
            String sqlQuery = new String();
            while ((line = reader.readLine()) != null) {
                sqlQuery += line;
            }
            reader.close();
            return sqlQuery;
        }
        catch(Exception exception){
            System.out.println("Чтение файлов не работает");
            System.out.println(exception.toString());
            return "FAIL READ FILE";
        }
    }
}
