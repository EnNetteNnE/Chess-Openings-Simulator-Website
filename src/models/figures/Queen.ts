import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from '../../assets/black-queen.png'
import whitelogo from '../../assets/white-queen.png'

export class Queen extends Figure {
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell); //вызов конструктора родительского класса
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell) : boolean {
        if(!super.canMove(target)) 
            return false;
        if(this.cell.isEmptyVertical(target)) 
            return true;
        if(this.cell.isEmptyHorizontal(target)) 
            return true;
        if(this.cell.isEmptyDiagonal(target)) 
            return true;
        return false
    }

}