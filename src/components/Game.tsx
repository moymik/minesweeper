import React, {useCallback, useEffect, useState} from 'react';
import {CellData, CellCoordinates, FieldData} from "../Types";
import Field from "./Field";
import {getNeighboursCoordinates, initEmptyField, initFilledField} from "../helpers/helpers";
import Cell from "./Cell";
import field from "./Field";
import TopPanel from "./TopPanel";
import Timer from "./Timer";
import bom from "../assets/BOMBOM.m4a"
import bombs from "../assets/bombs.mp4";
import {loadFull} from "tsparticles"
import Particles from "react-particles";
import {loadSlim} from "tsparticles-slim";
import {Engine} from "tsparticles-engine";
import {Container} from "react-dom";
import WinScreen from "./WinScreen";
import FlagCounter from "./FlagCounter";

function Game() {
    const [fieldData, setFieldData] = useState<FieldData>(initEmptyField())
    //gamestatus setGameStatus "won lost started ...."
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameLost, setGameLost] = useState<boolean>(false)
    const [gameWon, setGameWon] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(0)
    const [timerId, setTimerId] = useState<number>(0)
    const [flagsCounter, setFlagsCounter] = useState<number>(0);

    let bombsVid = bombs


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
        if (!cellData.hasFlag) makeMove(cellData, fieldData);
    }

    function changeFlagStatus(cellData: CellData): void {
        if (gameStarted) {
            setFieldData((fieldData: CellData[][]) => {
                return [...fieldData.map(rowData => {
                    return rowData.map(currentCellData => {
                        return {
                            ...currentCellData,
                            hasFlag: (currentCellData === cellData) ? !currentCellData.hasFlag : currentCellData.hasFlag
                        }
                    })
                })]
            })
        }
    }

    function handleCellRightClick(cellData: CellData): void {
        if (gameStarted) {
            if (!cellData.isOpened) {
                changeFlagStatus(cellData);
            }
        }
    }

    function countOpenedCells(fieldData: FieldData): number {
        let counter = 0;
        fieldData.forEach((row: CellData[]) => {
            row.forEach((cell: CellData) => {
                if (cell.isOpened) counter++
            })
        })
        return counter;
    }

    /*
        function handleRightClick(cellData: CellData): void {
            if (gameStarted) {
                setFieldData((fieldData: CellData[][]) => {
                    return [...fieldData.map(rowData => {
                        return rowData.map(currentCellData => {
                            if(currentCellData==cellData) console.log(1);
                            return {
                                ...currentCellData,
                                isFlagged:(currentCellData === cellData)
                            }
                        })
                    })]
                })
            }
        }
    */
    function makeMove(chosenCellData: CellData, fieldData: FieldData): void {
        if (chosenCellData.hasMine) {
            setGameLost(true)
            clearInterval(timerId);
            let audio = new Audio(bom);
            audio.setAttribute("loop", "loop")
            audio.play();
            /* let minedCells = []
             fieldData.forEach((rowData:CellData[])=>{
                 rowData.forEach((cellData: CellData)=>{
                   if(cellData.hasMine)minedCells.push(cellData.coordinates);
                 })
             })*/

            setFieldData((fieldData) => {
                return openAllCells(fieldData)
            });

        } else {

            setFieldData((fieldData) => {
                let result = openArea(chosenCellData, fieldData)
                if (countOpenedCells(result) === fieldData.length * fieldData[0].length - 40) {
                    setGameWon(true);
                }
                return result
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


    const options = {
        preset: "fireworks",
    };

    if (gameWon) return <WinScreen></WinScreen>
    else return (
        <div className={"game"}>
            <FlagCounter fieldData={fieldData}></FlagCounter>
            <Timer timerValue={timer}></Timer>
            <TopPanel minesCounter={flagsCounter} timerValue={timer}></TopPanel>
            <Field bombsVid={bombsVid} gameLost={gameLost} fieldData={fieldData} handleCellClick={handleCellClick}
                   handleCellRightClick={handleCellRightClick}/>
        </div>
    );
}
;

export default Game;