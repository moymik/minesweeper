import {CellData, FieldData} from "../Types";

interface FlagCounterProps {
    fieldData:FieldData
}

const FlagCounter = ({fieldData}:FlagCounterProps)=>{
    let counter = 40;
    fieldData.forEach((row: CellData[]) => {
        row.forEach((cell: CellData) => {
            if (cell.hasFlag) counter--
        })
    })
    return <div className={"flagCounter"}>{counter}</div>
}
export default FlagCounter