import React, {FC, ReactElement} from 'react';
import {CellData, FieldData} from "../Types";
import Cell from "./Cell";

interface FieldProps {
    bombsVid: string;
    gameLost: boolean;
    fieldData: FieldData;
    handleCellClick: (cellData: CellData) => void
    handleCellRightClick: (cellData: CellData) => void
}

const Field = ({bombsVid,gameLost, fieldData, handleCellClick, handleCellRightClick}: FieldProps) => {
    return (
        <table className={"field"}>
            <tbody>
            {fieldData.map((rowsData: CellData[]) => (<tr key={rowsData[0].coordinates.x} className={"field__row"}>
                {rowsData.map((cellData) => {
                    cellData = cellData
                    return <Cell
                        bombsVid={bombsVid}
                        key={`${cellData.coordinates.x}${cellData.coordinates.y}`}
                                 handleCellClick={handleCellClick}
                                 handleCellRightClick={handleCellRightClick}
                                 cellData={cellData}
                                 gameLost={gameLost}
                    />
                })}
            </tr>))}
            </tbody>
        </table>
    )
}

export default Field;