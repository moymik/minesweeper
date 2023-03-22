import React from 'react';

interface TimerProps {
    timerValue: number
}

const Timer = (props: TimerProps) => {
    let seconds = String(props.timerValue % 60)
    if (seconds.length === 1) seconds = "0" + seconds

    return (
        <div className={"timer"}>
            {Math.floor(props.timerValue / 60)} : {seconds}
        </div>
    );
};

export default Timer;