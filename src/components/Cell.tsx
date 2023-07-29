import React, {ReactElement, useEffect, useRef} from 'react';
import {CellData} from "../Types";
import bombs from "../assets/bombs.mp4"
import ReactDOM from "react-dom/client";

interface CellProps {
    bombsVid: string
    cellData: CellData
    handleCellClick: (cellData: CellData) => void
    handleCellRightClick: (cellData: CellData) => void
    gameLost: boolean
}

function determineTextStyle(minesCounter: number) {
    switch (minesCounter) {
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

const Cell = ({bombsVid, gameLost, cellData, handleCellClick, handleCellRightClick}: CellProps) => {
    let className = "field__cell";
    if (!cellData.isOpened) {
        className += " field__cell--closed"
        if (cellData.hasFlag) className += " field__cell--hasFlag"
    }
    if (cellData.isOpened && cellData.hasMine) className += " field__cell--mined"
    if (cellData.isOpened && !cellData.hasMine) className += ` field__cell--opened ${determineTextStyle(cellData.nearestMinesCounter)}`
    let lol:any = useRef(null);
    let bombsE = <video ref = {lol} src={bombsVid} autoPlay={false} width={"97%"} height={"97%"} className={"field__cell--bomb_video"}></video>;
    if (gameLost && cellData.hasMine) {
        let startTime = Math.random() * 34 * 1000;
        setTimeout(()=>{if(lol.current)lol.current.play()},startTime);
        return <td className={"field__cell"} >{bombsE}</td>
    }

    return <td
        onContextMenu={(e) => {
            e.preventDefault()
            handleCellRightClick(cellData)
        }}
        onClick={() => {
            handleCellClick(cellData)
        }}
        className={className}>{cellData.nearestMinesCounter && cellData.isOpened && !cellData.hasMine ? cellData.nearestMinesCounter : ""}</td>

};

export default Cell;