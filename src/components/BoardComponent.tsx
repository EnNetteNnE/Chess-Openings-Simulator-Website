import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import { Modes } from '../models/Modes';
import { Mod } from '../models/Mod';
import DebutsMake from './DebutsMake';


interface BoardProps { //интерфейс ожидаемых пропсов
    board: Board;
    setBoard: (board: Board) => void; // функция которой можно изменить доску!!!!!!!!
    currentPlayer: Player | null;
    swapPlayer: () => void;
    mod: Mod;
}

//FC указывает что это функциональный компонент
const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, mod}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    // состояние, функция которая изменяет состояние. Тип в состоянии или ячейка или нулл

    function click(cell: Cell) { // аргумент ячейка, на которую нажали
        // если у нас есть выбранная ячейка, на которой стоит фигура,  
        // и эта ячейка не равняется той на которую мы хотим нажать
        // и кэн мув возвращает тру
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) { // если содержит фигуру
            selectedCell.moveFigure(cell); // то двигаем фигурку
            swapPlayer()
            setSelectedCell(null); // меняем состояние
            updateBoard() // в видео он не нужен, а нам нужно обновить
        }
        else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }     
        }
    }

    
    

    useEffect(() => { // чтобы реакт перерисовал компонент
        highlightCells() // вызывается на любое изменение ячейки
    }, [selectedCell])

    function highlightCells() { // выставление свойства аваэлибл, подсветка доступных ячеек
        board.highlightCells(selectedCell) // подсветка необходимых ячеек
        updateBoard() // перерисовываем доску
    }

    function updateBoard() { // обновление состояния, при перерисовке доски вызывается
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    if ((mod.mod === Modes.NULL)) {
        return ( 
        <div>

        <h1>Выберите режим игры</h1>
        <h1>или</h1>
        <h1>создайте новый дебют (+)</h1>

        </div> 
        );
    }

  return (
    <div>
        

            <div>

            <h3>Текущей игрок {currentPlayer?.color}</h3>
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
            <h3>Текущей игрок {currentPlayer?.color}</h3>

        </div>

    

    </div>
  );
};

export default BoardComponent;