import React from 'react';
import FontAwesome from 'react-fontawesome';


const CheckerButton = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <FontAwesome name="lock" />
                </button>;
            break;

        case false:
            button =
                <button className="btn btn-danger">
                    <FontAwesome name="times" />
                </button>;
            break;

        default:
            button =
                <button className='btn' disabled={props.selectedNumbers.length === 0}
                    onClick={props.checkAnswer}>
                    <FontAwesome name="question" />
        </button>;
            break;
    }

    return (
        <div className="text-center">
            {button}
            <br /><br />
            <button className="btn btn-success btn-sm"
                onClick={props.redraw} disabled={props.gameOver || props.redrawsLeft === 0}>
                <FontAwesome name="refresh" /> {props.redrawsLeft}
            </button>
        </div>
    );
}

export default CheckerButton;