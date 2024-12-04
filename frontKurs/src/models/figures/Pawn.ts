import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from '../../assets/black-pawn.png'
import whitelogo from '../../assets/white-pawn.png'

export class Pawn extends Figure {
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell); //вызов конструктора родительского класса
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.PAWN;
        if(cell.y === 1 || cell.y === 6) {this.isFirstStep= true;}
        else {this.isFirstStep= false}  
    }

    canMove(target: Cell) : boolean {
        if(!super.canMove(target)) 
            return false;
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

        if ((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
          && target.x === this.cell.x
          && this.cell.board.getCell(target.x, target.y).isEmpty()
          && this.cell.board.getCell(this.cell.x, this.cell.y + direction).isEmpty()) {
          return true;
        }
    
        if(target.y === this.cell.y + direction
        && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
        && this.cell.isEnemy(target)) {
          return true;
        }
    
        return false;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

}