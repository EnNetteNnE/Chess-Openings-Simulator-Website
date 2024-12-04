package ru.nstu.EvaChess.controllers.dto;

import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
public record GetTokenRequest(String login, String password){

}
