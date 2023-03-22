export type CellData ={
    hasMine: boolean;
    isOpened: boolean;
    nearestMinesCounter: number;
    coordinates: CellCoordinates;
    hasFlag: boolean;
}

export type CellCoordinates = {
    x: number;
    y: number;
}

export type FieldData = CellData[][]