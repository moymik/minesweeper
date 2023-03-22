import React from 'react';
import Smile from "./Smile";
import Screen from "./Screen";

interface TopPanelProps {
    timerValue: number;
    minesCounter: number;
}

const TopPanel = (props: TopPanelProps) => {
    /*<Screen value={props.minesCounter}></Screen>
            <Smile></Smile>
            <Screen value={props.timerValue}></Screen>*/
    return (
        <div className = "top-panel">

        </div>
    );
};

export default TopPanel;