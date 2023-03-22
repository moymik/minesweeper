import React, {useEffect} from 'react';
import {CellData} from "../Types";

interface CellProps {
    cellData: CellData
    handleCellClick: (cellData: CellData) => void
}

function determineTextStyle(minesCounter:number){
    switch (minesCounter){
        case 0:
            return "field__cell--black"
        case 1:
            return "field__cell--blue"
        case 2:
            return "field__cell--green"
        case 3:
            return "field__cell--red"
        case 4:
            return "field__cell--darkblue"
        case 5:
            return "field__cell--darkred"
        case 6:
            return "field__cell--turquoise"
        case 7:
            return "field__cell--black"
        case 8:
            return "field__cell--gray"
    }
}

const Cell = ({cellData, handleCellClick}: CellProps) => {

    let cellElement = <td onClick={() => {
        handleCellClick(cellData)
    }} className={"field__cell field__cell--closed"}></td>
    if (!cellData.isOpened) {
        return cellElement;
    } else {
        if (cellData.hasMine) {
            return <td onClick={() => {
                handleCellClick(cellData)
            }} className={"field__cell field__cell--mined"}></td>
        } else {
            return <td onClick={() => {
                handleCellClick(cellData)
            }} className={`field__cell ${determineTextStyle(cellData.nearestMinesCounter)} field__cell--opened`} >{cellData.nearestMinesCounter?cellData.nearestMinesCounter:""}</td>
        }
    }
};

export default Cell;