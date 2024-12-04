import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { Modes } from '../models/Modes';
import { Mod } from '../models/Mod';
import DebutsMake from './DebutsMake';
import { Colors } from '../models/Colors';
import CellComponentForPlay from './CellCompoForPlay';
import { sendGetMoveRandom } from '../models/bek';


interface BoardProps { //интерфейс ожидаемых пропсов
    board: Board;
    setBoard: (board: Board) => void; // функция которой можно изменить доску!!!!!!!!
    currentPlayer: Player | null;
    swapPlayer: () => void;
    mod: Mod;
    boards: string[];
    token: string;
    setRestartTrue: (restartTrue: boolean) => void;
    restart: () => void;
    setCurrentPlayer: (currentPlayer: Player | null) => void;
}

//FC указывает что это функциональный компонент
const BoardComponent: FC<BoardProps> = ({board, setBoard, swapPlayer, mod, boards, currentPlayer, token, setRestartTrue, restart, setCurrentPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [boardEnd, setBoardEnd] = useState<boolean>(false);
    const [hod, setHod] = useState<boolean>(false);
    const [black, setBlack] = useState<boolean>(true);
    console.log("tttttttttttttttt", black)

    // состояние, функция которая изменяет состояние. Тип в состоянии или ячейка или нулл

    function click(cell: Cell) { // аргумент ячейка, на которую нажали
        // если у нас есть выбранная ячейка, на которой стоит фигура,  
        // и эта ячейка не равняется той на которую мы хотим нажать
        // и кэн мув возвращает тру
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) { // если содержит фигуру
            selectedCell.moveFigure(cell); // то двигаем фигурку
            //cell.board.swap()
            swapPlayer()
            setSelectedCell(null); // меняем состояние
            //updateBoard() // в видео он не нужен, а нам нужно обновить
            //console.log("+++")
            //тут внимательно проверять очередность хода, если вызов функции переносить
            
            let boardSTR: string = "";
            boardSTR = cell.board.boardToString();
            if(currentPlayer?.color === Colors.WHITE) {boardSTR += "b"}
            else {boardSTR += "w"}
            let id = cell.board.MoveTo(boardSTR, mod.debut.id, token);
            //тут нужна функция чтобы проверить а есть ли такая строчка вообще, и если есть, то вернуть просто её id, а если нет, то всё забить в бэк и вернуть id
            console.log({boardSTR})
            board.BoardsStr.push({str: boardSTR, id: id}) /////Ева, обрати сюда внимание, раскоменти эту строчку, тут FEN
            cell.board.NextM()
            //board.Boards.push(cell.board)
        }
        else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }     
        }
    }

    function clickByPlay(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) { // если содержит фигуру
            selectedCell.moveFigure(cell); // то двигаем фигурку
            
            
            let boardSTR: string = "";
            boardSTR = cell.board.boardToString();
            if(currentPlayer?.color === Colors.WHITE) {boardSTR += "b"}
            else {boardSTR += "w"}

            //функция тут нужна, которая проверит есть ли такой ход, и если есть возвращает его id и строку а если нет то вернёт 0
            let bod = cell.board.HodWhy(boardSTR);
            console.log(bod)
            cell.board.BoardsStr.push({str: bod.str, id: bod.id})
            console.log(bod)
            if (bod.id === -1) {
                setRestartTrue(true)
                restart()
                setBlack(true)
            }
            else if (bod.id === 0) {
                //тут состояние, чтобы вывелось что такого хода нет и откатить назад
                setHod(true)
                back()
            } else {
                // тут берем рандомный ход и перерисовываем доску
                let Hod = sendGetMoveRandom(bod.id);
                console.log(Hod)
                if(Hod.id === 0) {
                    setRestartTrue(true)
                    restart();
                    setBlack(true)
                } else {
                    const bor: Board = board.stringToBoard(Hod.positionAfter)
                    cell.board.BoardsStr.push({str: Hod.positionAfter, id: Hod.id})
                    setBoard(bor)
                    cell.board = bor
                    setHod(false)
                }
                
            }

            //let id = cell.board.MoveTo(boardSTR, mod.debut.id, token);
            
            //console.log({boardSTR})
            //board.BoardsStr.push({str: boardSTR, id: id}) /////Ева, обрати сюда внимание, раскоменти эту строчку, тут FEN
            //cell.board.NextM()//тут нужна функция чтобы проверить а есть ли такая строчка вообще, и если есть, то вернуть просто её id, а если нет, то всё забить в бэк и вернуть id
            setSelectedCell(null); // меняем состояние
        }
        else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }     
        }
        (mod.mod === Modes.PLAYWHITE) ? setCurrentPlayer(new Player(Colors.WHITE)) : setCurrentPlayer(new Player(Colors.BLACK));
    }
    

    useEffect(() => { // чтобы реакт перерисовал компонент
        highlightCells() // вызывается на любое изменение ячейки
    }, [selectedCell, boardEnd])

    function highlightCells() { // выставление свойства аваэлибл, подсветка доступных ячеек
        board.highlightCells(selectedCell) // подсветка необходимых ячеек
        //board.highlightArrow(selectedCell)
        updateBoard() // перерисовываем доску
    }

    function updateBoard() { // обновление состояния, при перерисовке доски вызывается
        //board.highlightArrow(selectedCell)
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }



    const delet = () => {
        //отправляем на бэк сообщение об уалении ветки
        back()
    }

    const back = () => { //4 часа утра, ахуеть, оно работает, я в шоке, комментарии этого кода больше похожи на записки сумашедего
        
        
        if (board.BoardsStr.length > 1) {
            //board.Boards.pop()
            //console.log(board.Boards.length)
            //const nBoard: Board = board.Boards[board.Boards.length - 1].getCopyBoard()
            //if (nBoard.getCell(3, 3).figure) {console.log(0)}
            //else {console.log(1)}
            //console.log(board.BoardsStr.length)

            board.BoardsStr.pop()
            const b: string = board.BoardsStr[board.BoardsStr.length - 1].str
            //console.log(b)
            const bor: Board = board.stringToBoard(b)
            swapPlayer()
            setBoard(bor)
            board = bor
            board.NextM()
            //setBoard(nBoard)
            //setBoardEnd(!boardEnd)
            /*let boardSTR: string = "";
            boardSTR = nBoard.boardToString();
            if(currentPlayer?.color === Colors.WHITE) {boardSTR += "b"}
            else {boardSTR += "w"}
            console.log({boardSTR})*/
            setSelectedCell(null);
            //console.log(board.BoardsStr.length)
        }
        
    }

    //board.highlightArrow(selectedCell)
    if ((mod.mod === Modes.NULL) || (mod.mod === Modes.PLAY)) {
        return ( 
        <div className='choose'>

        <h1>Выберите режим игры или</h1>
        <h1>создайте новый дебют (+)</h1>

        </div> 
        );
    }

    if (mod.mod === Modes.PLAYWHITE) {
        return (
            <div>
                <h3>Текущей игрок {(currentPlayer?.color === Colors.WHITE) ? "Белый" : "Чёрный"}</h3>
                <div className="board">
                {board.cells.map((row, index) => // индексом проходимся по ров индексами
                    //Фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов в DOM
                    <React.Fragment key={index}>
                                
                        {row.map(cell => //тк индекс это массив, по нему мы тоже итерируемся, и уже тут отрисовывем компонент ячейки, тут же передаем компонент пропсом
                            <CellComponentForPlay
                                treehod={cell.isHod()}
                                click={clickByPlay}
                                cell={cell}
                                
                                //z={cell.znach}
                                key={cell.id} // для элемента массива нужно указывать ключ
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                // если текущая и выбранная равны
                            />
                        )}
                    </React.Fragment>
                )}
                </div>
                {hod ? <div style={{color:'red'}}>Такого хода в дебюте нет</div> : ""}
            </div>
        );
    }

    console.log("bbbbbbbbbbb", black)

    

    if (mod.mod === Modes.PLAYBLACK) {
        //туть нада 
        
        if (board.BoardsStr.length < 2) {
        console.log("blaaaaaackkkkkkkkkkkkkkkkkkkkk")
            setBlack(false)
            
            let Hod = sendGetMoveRandom(board.BoardsStr[board.BoardsStr.length - 1].id);
                console.log(Hod)
                if(Hod.id === 0) {
                    setRestartTrue(true)
                    restart();
                } else {
                    const bor: Board = board.stringToBoard(Hod.positionAfter)
                    board.BoardsStr.push({str: Hod.positionAfter, id: Hod.id})
                    setBoard(bor)
                    board = bor
                    setHod(false)
                }
            setCurrentPlayer(new Player(Colors.BLACK))
            setSelectedCell(null); // меняем состояние
        }

        return (
            <div>
                <h3>Текущей игрок {(currentPlayer?.color === Colors.WHITE) ? "Белый" : "Чёрный"}</h3>
                <div className="board">
                {board.cells.map((row, index) => // индексом проходимся по ров индексами
                    //Фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов в DOM
                    <React.Fragment key={index}>
                                
                        {row.map(cell => //тк индекс это массив, по нему мы тоже итерируемся, и уже тут отрисовывем компонент ячейки, тут же передаем компонент пропсом
                            <CellComponentForPlay
                                treehod={cell.isHod()}
                                click={clickByPlay}
                                cell={cell}
                                
                                //z={cell.znach}
                                key={cell.id} // для элемента массива нужно указывать ключ
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                // если текущая и выбранная равны
                            />
                        )}
                    </React.Fragment>
                )}
                </div>
                {hod ? <div style={{color:'red'}}>Такого хода в дебюте нет</div> : ""}
            </div>
        );
    }

  return (
    <div>
        

            <div>

            <h3>Текущей игрок {(currentPlayer?.color === Colors.WHITE) ? "Белый" : "Чёрный"}</h3>
            <div className="board">
                {board.cells.map((row, index) => // индексом проходимся по ров индексами
                    //Фрагменты позволяют формировать список дочерних элементов, не создавая лишних узлов в DOM
                    <React.Fragment key={index}>
                                
                        {row.map(cell => //тк индекс это массив, по нему мы тоже итерируемся, и уже тут отрисовывем компонент ячейки, тут же передаем компонент пропсом
                            <CellComponent
                                treehod={cell.isHod()}
                                click={click}
                                cell={cell}
                                
                                //z={cell.znach}
                                key={cell.id} // для элемента массива нужно указывать ключ
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                // если текущая и выбранная равны
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
            <button onClick={() => delet()} className="Delete">Удалить текущую ветку</button>
            <button onClick={() => back()} className="Back">Назад</button>

        </div>

    

    </div>
  );
};

export default BoardComponent;