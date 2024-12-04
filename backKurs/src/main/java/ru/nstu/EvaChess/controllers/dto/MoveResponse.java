package ru.nstu.EvaChess.controllers.dto;

import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
public record MoveResponse(long id, Long number, Long treeId, String positionAfter, String nameMove, Boolean colorWhite, Long preventMove) {
}
