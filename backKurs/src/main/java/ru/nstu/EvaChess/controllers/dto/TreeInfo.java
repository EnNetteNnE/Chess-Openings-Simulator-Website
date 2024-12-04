package ru.nstu.EvaChess.controllers.dto;

import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
public record TreeInfo(long id, String name) {
}
