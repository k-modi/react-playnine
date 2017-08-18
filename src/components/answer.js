import React from 'react';

const Answer = (props) => {
    return (
        <div>
            {props.selectedNumbers.map((num, i) =>
                <span key={i} onClick={() => props.deselectNumber(num)}>
                    {num}
                </span>
            )}
        </div>
    );
}

export default Answer;