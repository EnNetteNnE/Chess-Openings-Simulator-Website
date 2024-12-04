package ru.nstu.EvaChess.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.nstu.EvaChess.controllers.dto.CreateMoveRequest;
import ru.nstu.EvaChess.controllers.dto.MoveResponse;
import ru.nstu.EvaChess.models.Move;
import ru.nstu.EvaChess.models.TreeMove;
import ru.nstu.EvaChess.repositories.MoveRepository;
import ru.nstu.EvaChess.repositories.TreeMoveRepository;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service(value = "moveService")
@RequiredArgsConstructor
public class MoveService {

    private final MoveRepository moveRepository;
    private final TreeMoveRepository treeMoveRepository;

    public MoveResponse getMoveResponse(Move move){
        try{
            return new MoveResponse(
                    move.getId(),
                    move.getNumber(),
                    move.getTreeId().getId(),
                    move.getPositionAfter(),
                    move.getNameMove(),
                    move.getColorWhite(),
                    move.getPreventMove().getId()
            );
        }
        catch (Exception exception){
            log.info(exception.toString());
            return new MoveResponse(
                    move.getId(),
                    move.getNumber(),
                    move.getTreeId().getId(),
                    move.getPositionAfter(),
                    null, //move.getNameMove(),
                    move.getColorWhite(),
                    null
            );
        }
    }

    public MoveResponse createMove(CreateMoveRequest createMoveRequest){
        Move move = new Move(
                treeMoveRepository.findById(createMoveRequest.treeId()).get(),
                createMoveRequest.positionAfter(),
                moveRepository.findById(createMoveRequest.preventMoveId()).get(),
                createMoveRequest.colorWhite()
        );
        return getMoveResponse(moveRepository.save(move));
    }

    public MoveResponse createNullMove(TreeMove tree){
        return getMoveResponse(moveRepository.save(new Move(tree ,"baseFEN", null, 0)));
    }

    public MoveResponse getNullMove(long idTree){
        return getMoveResponse(moveRepository.getNullMove(idTree));
    }

    public List<MoveResponse> getAllNextMoves(long moveId){

        List<MoveResponse> moveResponseList = new ArrayList<>();

        for(Move move : moveRepository.getAllNextMoves(moveId)) {
            moveResponseList.add(getMoveResponse(move));
        }

        return moveResponseList;
    }

    public MoveResponse getRandomNextMove(long moveId){
        SecureRandom random = new SecureRandom();
        List<MoveResponse> allMoves = getAllNextMoves(moveId);
        if (allMoves.size() > 0) {
            int rnd = random.nextInt(allMoves.size());
            return allMoves.get(rnd);
        }
        return new MoveResponse(0, null, null, null, null, null, null);
    }

}
