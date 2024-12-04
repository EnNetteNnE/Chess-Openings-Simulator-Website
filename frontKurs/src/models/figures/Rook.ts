import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from '../../assets/black-rook.png'
import whitelogo from '../../assets/white-rook.png'

export class Rook extends Figure {

    
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell); //вызов конструктора родительского класса
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.ROOK;
        if(((cell.x === 0) || (cell.x === 7)) && ((cell.y === 0) || (cell.y === 7))) {this.isFirstStep= true;}
        else {this.isFirstStep= false}  
    }

    canMove(target: Cell) : boolean {
        if(!super.canMove(target)) 
            return false;
        if(this.cell.isEmptyVertical(target)) 
            return true;
        if(this.cell.isEmptyHorizontal(target)) 
            return true;
        return false
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

}