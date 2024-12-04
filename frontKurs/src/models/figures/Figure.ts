import { Colors } from "../Colors";
import logo from '../../assets/black-king.png'
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон",
}

export class Figure { //от этого класса будут наследоваться все фигуры
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;
    isFirstStep: boolean;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this; // удобство кольцевой зависимости
        this.logo = null; //тк базовый класс и конкретного лого нет, то нулл
        this.name = FigureNames.FIGURE //базовый класс
        this.id = Math.random()
        this.isFirstStep = true
    }

    canMove(target: Cell) : boolean { //принимает ячейку, на которую мы хотим переместиться
        if(target.figure?.color === this.color) {
            return false
        }
        if(target.figure?.name === FigureNames.KING) {
            return false
        }
        return true;
    }

    moveFigure(target: Cell) {}
}