package ru.nstu.EvaChess.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.nstu.EvaChess.controllers.dto.CreateTreeRequest;
import ru.nstu.EvaChess.controllers.dto.TreeInfo;
import ru.nstu.EvaChess.models.TreeMove;
import ru.nstu.EvaChess.repositories.TreeMoveRepository;
import ru.nstu.EvaChess.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service(value = "treeMoveService")
@RequiredArgsConstructor
public class TreeMoveService {

    private final TreeMoveRepository treeMoveRepository;
    private final MoveService moveService;
    private final UserService userService;

    public TreeMove createTree(String token, CreateTreeRequest createTreeRequest) {

        TreeMove tree = treeMoveRepository.save(new TreeMove(userService.getByToken(token), createTreeRequest.name()));
        moveService.createNullMove(tree);
        return tree;
    }

    public List<TreeInfo> getAllTree(String token){
        List<TreeMove> trees = treeMoveRepository.getAllTree(userService.getByToken(token).getId());
        List<TreeInfo> treeInfos = new ArrayList<TreeInfo>();
        for(TreeMove tree : trees){
            treeInfos.add(new TreeInfo(tree.getId(), tree.getName()));
        }
        return treeInfos;
    }
}
