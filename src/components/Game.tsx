import React, {useEffect, useState} from 'react';
import {CellData, CellCoordinates, FieldData} from "../Types";
import Field from "./Field";
import {getNeighboursCoordinates, initEmptyField, initFilledField} from "../helpers/helpers";
import Cell from "./Cell";
import field from "./Field";
import TopPanel from "./TopPanel";
import Timer from "./Timer";

function Game() {
    const [fieldData, setFieldData] = useState<FieldData>(initEmptyField())
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameLost, setGameLost] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [timerId, setTimerId] = useState<number>(0)
    const [flagsCounter, setFlagsCounter] = useState<number>(0);


    useEffect(() => {
        let interval: number;
        if (gameStarted) {
            setTimer(0);
            interval = setInterval(() => {
                setTimer(timer => (timer + 1))
            }, 1000)
            setTimerId(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [gameStarted])

    function handleCellClick(cellData: CellData): void {
        if (!gameStarted) {
            let generatedFieldData = initFilledField({x: cellData.coordinates.x, y: cellData.coordinates.y})
            setFieldData(generatedFieldData)
            setGameStarted(true)

        }
        makeMove(cellData, fieldData);
    }

    /*function handleRightClick(cellData: CellData): void {
        if (gameStarted) {
            setFieldData((fieldData: CellData[][]) => {
                return [...fieldData.map(rowData => {
                    return rowData.map(currentCellData => {
                        return {
                            ...currentCellData,
                            isFlagged:(currentCellData === cellData) ? !currentCellData.isOpened : currentCellData.isOpened
                        }
                    })
                })]
            })
        }
    }
-*/
    function makeMove(chosenCellData: CellData, fieldData: FieldData): void {
        if (chosenCellData.hasMine) {
            setGameLost(true)
            clearInterval(timerId);
            setFieldData((fieldData) => openAllCells(fieldData))

        } else {
            setFieldData((fieldData) => {
                return openArea(chosenCellData, fieldData)
            });
        }
    }

    function openAllCells(fieldData: FieldData): FieldData {
        let openedFieldData = [
            ...fieldData.map(rowData => {
                return rowData.map(cellData => {
                    return {
                        ...cellData,
                        isOpened: true
                    }
                })
            })
        ]
        return openedFieldData;
    }

    function openArea(initialCell: CellData, fieldData: FieldData): FieldData {
        console.log(22)
        let coordinatesToCheck: CellCoordinates[] = [initialCell.coordinates];
        let coordinatesToOpen: CellCoordinates[] = []
        let i = 0;
        while (coordinatesToCheck.length > 0) {
            i++
            let currentCoordinates = coordinatesToCheck.pop() as CellCoordinates;

            if (fieldData[currentCoordinates.x][currentCoordinates.y].nearestMinesCounter === 0) {
                let neighboursToCheck = getNeighboursCoordinates(currentCoordinates).filter((coordinates) => {
                    if (
                        coordinatesToOpen.some((coordinate) => (coordinate.x === coordinates.x && coordinate.y === coordinates.y))
                        || coordinatesToCheck.some((coordinate) => (coordinate.x === coordinates.x && coordinate.y === coordinates.y))
                        || fieldData[coordinates.x][coordinates.y].isOpened
                        || fieldData[coordinates.x][coordinates.y].hasMine
                    ) return false
                    else return true
                })
                coordinatesToCheck.push(...neighboursToCheck);
            }
            coordinatesToOpen.push(currentCoordinates)
            console.log(currentCoordinates)
            console.log("check", coordinatesToCheck)
            console.log("open", coordinatesToOpen)

        }

        console.log(i)
        let changedFieldData = [
            ...fieldData.map(rowData => {
                return rowData.map(cellData => {
                    if (coordinatesToOpen.some((coordinate) => (coordinate.x === cellData.coordinates.x && coordinate.y === cellData.coordinates.y))) {
                        return {
                            ...cellData,
                            isOpened: true
                        }
                    } else return cellData
                })
            })
        ]
        return changedFieldData;
    }


    return (
        <div  className={"game"}>
            <Timer  timerValue={timer}></Timer>
            <TopPanel minesCounter={flagsCounter} timerValue={timer}></TopPanel>
            <Field fieldData={fieldData} handleCellClick={handleCellClick} />
        </div>
    );
};

export default Game;