import React, {FC} from 'react';
import {CellData, FieldData} from "../Types";
import Cell from "./Cell";

interface FieldProps {
    fieldData: FieldData;
    handleCellClick: (cellData: CellData) => void
}

const Field = ({fieldData, handleCellClick}: FieldProps) => {
    return (
        <table className={"field"}>
            <tbody>
            {fieldData.map((rowsData: CellData[]) => (<tr key={rowsData[0].coordinates.x} className={"field__row"}>
                {rowsData.map((cellData) => {
                    cellData = cellData
                    return <Cell key={`${cellData.coordinates.x}${cellData.coordinates.y}`}
                                 handleCellClick={handleCellClick}
                                 cellData={cellData}/>
                })}
            </tr>))}
            </tbody>
        </table>
    )
}

export default Field;