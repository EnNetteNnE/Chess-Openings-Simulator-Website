package ru.nstu.EvaChess.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ru.nstu.EvaChess.GlobalApplicationConstant;
import ru.nstu.EvaChess.controllers.dto.CreateMoveRequest;
import ru.nstu.EvaChess.controllers.dto.MoveResponse;
import ru.nstu.EvaChess.services.MoveService;

import java.util.List;

@RestController
@RequestMapping("/move")
@Slf4j
@RequiredArgsConstructor
public class MoveController {

    private final MoveService moveService;

    @PostMapping
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public MoveResponse createMove(@RequestBody CreateMoveRequest createMoveRequest){
        return moveService.createMove(createMoveRequest);
    }

    @GetMapping("/tree/{id}")
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public MoveResponse getNullMove(@PathVariable("id") long treeId){
        return moveService.getNullMove(treeId);
    }

    @GetMapping("/next/{id}")
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public List<MoveResponse> getAllNextMove(@PathVariable("id") long moveId){
        return moveService.getAllNextMoves(moveId);
    }

    @GetMapping("/random/{id}")
    @CrossOrigin(origins = GlobalApplicationConstant.FRONT_URL)
    public MoveResponse getRandomNextMove(@PathVariable("id") long moveId){
        return moveService.getRandomNextMove(moveId);
    }
}
