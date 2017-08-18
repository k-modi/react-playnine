import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.selectedNumbers.indexOf(number) >= 0)
            return 'selected';
        else if (props.usedNumbers.indexOf(number) >= 0)
            return 'used';
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((num, i) =>
                    <span key={i} className={numberClassName(num)} onClick={() =>
                    {
                        if (props.selectedNumbers.indexOf(num) >= 0) {
                            props.deselectNumber(num);
                        } else if (props.usedNumbers.indexOf(num) < 0) {
                            props.selectNumber(num);
                        }
                    }}>
                        {num}
                    </span>
                )}
            </div>
        </div>
    );
}
Numbers.list = _.range(1, 10);

export default Numbers;