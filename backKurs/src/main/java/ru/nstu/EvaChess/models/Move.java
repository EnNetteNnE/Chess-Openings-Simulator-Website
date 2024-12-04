package ru.nstu.EvaChess.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "moves")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Move {

    public Move(TreeMove treeMove, String positionAfter, /*String nameMove,*/ Move preventMove, Boolean colorWhite){
        if(colorWhite)
            this.number = preventMove.getNumber() + 1;
        this.treeId = treeMove;
        this.positionAfter = positionAfter;
        //this.nameMove = nameMove;
        this.preventMove = preventMove; //TODO: Проверка на то, что прошлый ход черный/белый
        this.colorWhite = colorWhite;
    }

    public Move(TreeMove treeMove, String positionAfter, /*String nameMove,*/ Move preventMove, long number){
        //this.number = number;
        this.treeId = treeMove;
        this.positionAfter = positionAfter;
        this.number = number;
        //this.nameMove = nameMove;
        this.preventMove = preventMove;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "number")
    private long number;

    @ManyToOne
    @JoinColumn(name = "tree_id")
    private TreeMove treeId;

    @Column(name = "position_after")
    private String positionAfter;

    @Column(name = "name_move")
    private String nameMove;

    @Column(name = "color_white")
    private Boolean colorWhite;

    @ManyToOne
    @JoinColumn(name = "prevent_move")
    private Move preventMove;
}
