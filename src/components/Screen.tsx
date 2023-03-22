import React from 'react';

interface ScreenProps {
    value: number
}

const Screen = (props: ScreenProps) => {
    return (
        <div>
            {props.value}
        </div>
    );
};

export default Screen;