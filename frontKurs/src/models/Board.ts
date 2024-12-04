import App from "../App";
import {Cell} from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Znach } from "./figures/Znach";
import { sendGetMoveNext, sendPostMove } from './bek';

export class Board {
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    Debuts: { id: number; name: string }[] = []
    Boards: Board[] = []
    BoardsStr: {str: string, id: number}[] = []
    numberHod: number = 0
    currentPlayer: Colors = Colors.WHITE
    nextMoves: {x: number, y: number}[] = []
    itMoves: {
        id: number,
        number: number,
        treeId: number,
        positionAfter: string,
        nameMove: null | string,
        colorWhite: boolean,
        preventMove: number
    }[] = []
    //id: number = 0
    //token: string = "0"


 /*   
    addDebuts() {
        this.Debuts.push('1234')
        this.Debuts.push('1234xcxfcgv')
        this.Debuts.push('erygsb')
        this.Debuts.push('0987654')
        this.Debuts.push('098765421111111111')
    }
*/

    

    public initCells() {
        for(let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null, null)) // черные
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null, null)) // белые
                }
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board; // новый объект доски
        newBoard.cells = this.cells; // переносим ячейки
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.Debuts = this.Debuts
        newBoard.Boards = this.Boards
        newBoard.BoardsStr = this.BoardsStr
        newBoard.currentPlayer = this.currentPlayer
        //newBoard.token = this.token
        return newBoard; // возвращаем уже новую доску
    }

    public highlightCells(selecttedCell: Cell | null) { // подсветка ячеек
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j]; // проходимся по всем ячейкам
                target.available = !!selecttedCell?.figure?.canMove(target) // меняем поле аваилибл !! к булиан приобразовывает
                target.hodi = target.isHod()
            }
        }
    }

    public highlightArrow(selecttedCell: Cell | null) { // подсветка ячеек существующих ходов
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j]; // проходимся по всем ячейкам
                target.hodi = target.isHod()
            }
        }
    }

    public swap() {
        this.currentPlayer = ((this.currentPlayer === Colors.WHITE) ? Colors.BLACK : Colors.WHITE)
    }

    public HodWhy(str: string): {id: number, str: string} {
        const N = sendGetMoveNext(this.BoardsStr[this.BoardsStr.length - 1].id)
        if (N.length === 0) {
            return {id: -1, str: '0'}
        }
        this.itMoves = N;
        this.nextMoves = [];
        for (let i = 0; i < N.length; i++) {
            if (str === N[i].positionAfter) {
                return {id: N[i].id, str: N[i].positionAfter}
            }
        }

        return {id: 0, str: '0'}
    }

    public NextM() {
        const N = sendGetMoveNext(this.BoardsStr[this.BoardsStr.length - 1].id)
        this.itMoves = N;
        this.nextMoves = [];
        for (let i = 0; i < N.length; i++) {
            console.log("PA", N[i].positionAfter)
            const newBoard = this.stringToBoard(N[i].positionAfter);
            for(let j = 0; j < newBoard.cells.length; j++) {
                for(let k = 0; k < newBoard.cells[j].length; k++) {
                    //console.log(this.cells[j][k], newBoard.cells[j][k])
                    if (this.cells[j][k].figure?.name !== newBoard.cells[j][k].figure?.name || this.cells[j][k].figure?.color !== newBoard.cells[j][k].figure?.color) {
                        console.log(j, this.cells[j][k].figure?.name, k, newBoard.cells[j][k].figure?.name)
                        this.nextMoves.push({x: k, y: j});
                    }
                }
            }
        }
    }

    public MoveTo(str: string, treeId: number, token: string): number {
        for (let i = 0; i < this.itMoves.length; i++) {
            if (str === this.itMoves[i].positionAfter) {
                return this.itMoves[i].id;
            }
        }

        let id: number = sendPostMove(treeId, str, this.BoardsStr[this.BoardsStr.length - 1].id, (this.BoardsStr.length % 2) === 1, token);
        return id;
    }

    public stringToBoard(str: string) {
        let s: string[] = str.split(" ")
        let b: string[] = s[0].split("/")
        const newBoard = new Board(); 

        newBoard.initCells() //метод инициализации ячеек
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            let so: string = b[i];
            let n: number = 0;
            let j = 0;
            for (let bukind: number = 0; bukind < so.length; bukind++) {
                let isNumber = /^\d+$/.test(so[bukind])
                if (isNumber) {
                    let nun: number = parseInt(so[bukind])
                    for (let k = 0; k < nun; k++) {newBoard.getCell(j, i).figure = null; j++;}
                }
                else {
                    switch (so[bukind]) {
                        case ("b"): new Bishop(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("k"): new King(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("q"): new Queen(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("n"): new Knight(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("r"): new Rook(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("p"): new Pawn(Colors.BLACK, newBoard.getCell(j, i)); break;
                        case ("B"): new Bishop(Colors.WHITE, newBoard.getCell(j, i)); break;
                        case ("K"): new King(Colors.WHITE, newBoard.getCell(j, i)); break;
                        case ("Q"): new Queen(Colors.WHITE, newBoard.getCell(j, i)); break;
                        case ("N"): new Knight(Colors.WHITE, newBoard.getCell(j, i)); break;
                        case ("R"): new Rook(Colors.WHITE, newBoard.getCell(j, i)); break;
                        case ("P"): new Pawn(Colors.WHITE, newBoard.getCell(j, i)); break;        
                    }
                    j++;
                }
            }  
        }
        newBoard.Debuts = this.Debuts;
        newBoard.BoardsStr = this.BoardsStr
        return newBoard;
    }

    public boardToString() {
        let boardSTR: string = "";
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            let s: string = "";
            let n: number = 0;
            for (let j = 0; j < row.length; j++) {
                const target = row[j]; // проходимся по всем ячейкам
                if (target.figure) {
                    if (n !== 0) {s = s + n;}             
                    n = 0;
                    if (target.figure.color === Colors.BLACK) {
                        switch (target.figure.name) {
                            case (FigureNames.BISHOP): s += "b"; break;
                            case (FigureNames.KING): s += "k"; break;
                            case (FigureNames.QUEEN): s += "q"; break;
                            case (FigureNames.KNIGHT): s += "n"; break;
                            case (FigureNames.ROOK): s += "r"; break;
                            case (FigureNames.PAWN): s += "p"; break;
                        }
                    } else {
                        switch (target.figure.name) {
                            case (FigureNames.BISHOP): s += "B"; break;
                            case (FigureNames.KING): s += "K"; break;
                            case (FigureNames.QUEEN): s += "Q"; break;
                            case (FigureNames.KNIGHT): s += "N"; break;
                            case (FigureNames.ROOK): s += "R"; break;
                            case (FigureNames.PAWN): s += "P"; break;
                        }
                    }

                } else {
                    n++;
                    if (j === row.length - 1) {
                        s = s + n;
                    }
                }
            }
            boardSTR += s;
            if (!(i === this.cells.length - 1)) {boardSTR += "/"}
        }
        boardSTR += " ";
        
        let q: Cell = this.getCell(0, 0);
        let Q: Cell = this.getCell(0, 7);
        let k: Cell = this.getCell(7, 0);
        let K: Cell = this.getCell(7, 7);
        let king: Cell = this.getCell(4, 0);
        let KING: Cell = this.getCell(4, 7);

        let n: number = 0;

        if(K && KING) {
            if(K.figure?.isFirstStep && KING.figure?.isFirstStep) {
                boardSTR += "K"; n++;
            }
        }
        if(Q && KING) {
            if(Q.figure?.isFirstStep && KING.figure?.isFirstStep) {
                boardSTR += "Q"; n++;
            }
        }
        if(k && king) {
            if(k.figure?.isFirstStep && king.figure?.isFirstStep) {
                boardSTR += "k"; n++;
            }
        }
        if(q && king) {
            if(q.figure?.isFirstStep && king.figure?.isFirstStep) {
                boardSTR += "q"; n++;
            }
        }

        if(n === 0) {boardSTR += "-";}

        boardSTR += " ";
        return boardSTR;
    }
    
    constructor(){
        //this.highlightCells();
    }

    public getCell(x: number, y: number) { // возвращаем элемент ячейку
        return this.cells[y][x]
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }

    private addBishop() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }

    private addKnight() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }

    private addQueen() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }

    private addRook() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }

    private addZnach() {
        new Znach("1", this.getCell(7, 7))
    }

    public addFigures() {
        this.addBishop()
        this.addKings()
        this.addKnight()
        this.addPawns()
        this.addRook()
        this.addQueen()
        //this.addZnach()
        //this.addDebuts()
    }
}