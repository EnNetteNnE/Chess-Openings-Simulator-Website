import React, {FC, ReactNode} from 'react';
import {Cell} from "../models/Cell";
import { click } from '@testing-library/user-event/dist/click';

interface CellProps {
  cell: Cell;
  selected: boolean; // флаг выбрана ячейка или нет
  treehod: boolean;
  click: (cell: Cell) => void; // ожидаем функцию
  //children?: ReactNode;
}

const CellComponent: FC<CellProps> = ({cell, selected, treehod, click}) => {
  return (  
    <div>
      <div 
      className={['cell', cell.color, selected ? "selected" : cell.hodi ? "blukaz" : ''].join(' ')} // чтобы 2 класса объеденить в одну строку
      //если ячейка выбрана то селектид, или пустая строка
      onClick={() => click(cell)} // слушатель событий, вызываем функцию клик, и передаем туда ячейку
      //style={{background: cell.available && cell.figure ? '#76cd76' : cell.hodi ? '#0ce0e0' : ''}}
      style={{background: (cell.available && cell.figure) ? '#76cd76' : ''}}
      > 
        {false && cell.hodi && <div className={"blukaz"}/>}
        {(cell.available && !cell.figure) && <div className={"available"}/>}
        {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>} 
        {<div/>}
      </div>
    </div> 
    // отрисовка классНейм аваэлибл только если нет фигуры
    // если фигура на ячейке есть, то мы её отрисовываем
    
  );
};


//className={['cell', cell.color, treehod ? "treehod" : ''].join(' ')}
//style={{border: cell.hodi ? '#0ce0e0' : ''}}
//style={{background: cell.available && cell.figure ? '#76cd76' : cell.hodi ? '4px #0ce0e0' : ''}}

export default CellComponent;