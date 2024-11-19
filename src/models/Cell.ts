import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { Znach } from "./figures/Znach";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    znach: Znach | null;
    board: Board;
    available: boolean; // Можешь ли переместиться
    hodi: boolean;
    id: number; // для реакт ключей

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null, znach: Znach | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.znach = znach;
        this.board = board;
        this.available = false;
        this.id = Math.random()
        this.hodi = false;
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean { // проверяет что на таргете фигура противника
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if(this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for(let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if(this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for(let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX)
            return false;

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for(let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
                return false;
        }
        return true;
    }

    setFigure(figure: Figure) { //меняем фигуру для самой фигуры
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure:Figure) {
        figure.color === Colors.BLACK ? this.board.lostBlackFigures.push(figure) : this.board.lostWhiteFigures.push(figure)
    }

    isHod() : boolean {
        if (this.x === 4 && this.y === 6) {
            //return true
        }
        else if (this.x === 4 && this.y === 4) {
            //return true
        }
        return false;
    }

    moveFigure(target: Cell) { // перемещаем фигуру на ячейку
       
        if(this.figure && this.figure?.canMove(target) && (target.figure?.name === FigureNames.ROOK) && (this.figure?.name === FigureNames.KING) && (this.figure.color === target.figure.color)) {


            if(target.x === 0) { // тут рокировка тут мы ничего не съедаем ууууууу
                let targetKing = this.board.getCell(2, this.y);
                let targetRook = this.board.getCell(3, this.y);

                this.figure.moveFigure(target)  
                targetKing.setFigure(this.figure);
                this.figure = null; 
                targetRook.setFigure(target.figure);
                target.figure = null;                            
            }
            else if(target.x === 7) {
                let targetKing = this.board.getCell(6, this.y);
                let targetRook = this.board.getCell(5, this.y);

                this.figure.moveFigure(target)  
                targetKing.setFigure(this.figure);
                this.figure = null; 
                targetRook.setFigure(target.figure);
                target.figure = null;  
            }
            
        }

        else if(this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target)  //чисто шобы посчитать что это первый ход
            if(target.figure) {
                this.addLostFigure(target.figure);
            }
            target.setFigure(this.figure); //добавление на таргет ячейку
            this.figure = null; //удаление фигуры с текущей ячейки
        }
        //this.board.addDebuts();
    }
}


