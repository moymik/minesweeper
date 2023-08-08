import {CellCoordinates, CellData} from "../Types";

export function initEmptyField(): CellData[][] {
    let fieldData: CellData[][] = [];
    for (let i = 0; i < 16; i++) {
        fieldData[i] = [];
        for (let j = 0; j < 16; j++) {
            fieldData[i].push({
                isOpened: false,
                hasMine: false,
                nearestMinesCounter: 0,
                coordinates: {
                    x: i,
                    y: j,
                },
                hasFlag: false,
            })
        }
    }
    return fieldData;
}


export function initFilledField(forbiddenCoordinates: { x: number, y: number }): CellData[][] {
    let fieldData = initEmptyField();

    for (let i = 0; i < 40;) {
        let currentX = Math.floor(Math.random() * 16);
        let currentY = Math.floor(Math.random() * 16);

        if (!fieldData[currentX][currentY].hasMine
            && !(forbiddenCoordinates.x === currentX && forbiddenCoordinates.y === currentY)) {
            i++;
            fieldData[currentX][currentY].hasMine = true;
            //fieldData[currentX][currentY].hasFlag = true;//test
            //increasing the nearestMinesCounters properties of adjacent cells
            let neighboursCoordinates = getNeighboursCoordinates({x: currentX, y: currentY});
            neighboursCoordinates.forEach(coordinates => {
                fieldData[coordinates.x][coordinates.y].nearestMinesCounter++;
            })


        }

    }
    return fieldData
}

export function getNeighboursCoordinates(initialCoordinates: CellCoordinates): CellCoordinates[] {
    let result = []
    for (let j = initialCoordinates.x - 1; j <= initialCoordinates.x + 1; j++) {
        for (let k = initialCoordinates.y - 1; k <= initialCoordinates.y + 1; k++) {
            if (j >= 0 && j < 16 && k >= 0 && k < 16 && !(j === initialCoordinates.x && k === initialCoordinates.y)) result.push({
                x: j,
                y: k
            })
        }
    }
    return result;
}
