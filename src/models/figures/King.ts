import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from '../../assets/black-king.png'
import whitelogo from '../../assets/white-king.png'

export class King extends Figure {
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell); //вызов конструктора родительского класса
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell) : boolean {

        if(target.figure?.name === FigureNames.ROOK && target.figure?.color === this.color) {  //тут рокировка и моя смерть
            const min = Math.min(this.cell.x, target.x);
            const max = Math.max(this.cell.x, target.x);

            for(let x = min + 1; x < max; x++) {
                if(!this.cell.board.getCell(x, this.cell.y).isEmpty()) {
                    return false;
                }
            }

            if(this.isFirstStep && target.figure.isFirstStep) {
                return true;
            }

            return false
        }

        if(!super.canMove(target)) 
            return false;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);



        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1)
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }

}