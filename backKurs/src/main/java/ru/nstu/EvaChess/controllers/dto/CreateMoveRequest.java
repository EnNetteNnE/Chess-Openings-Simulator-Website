package ru.nstu.EvaChess.controllers.dto;

import ru.nstu.EvaChess.models.Move;
import ru.nstu.EvaChess.models.TreeMove;

public record CreateMoveRequest(long treeId, String positionAfter, long preventMoveId, Boolean colorWhite) {
}
