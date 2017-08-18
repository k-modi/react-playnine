import React from 'react';
import _ from 'lodash';
import FontAwesome from 'react-fontawesome';

const Stars = (props) => {
    return (
        <div>
            {_.range(props.numberOfStars).map((num, i) =>
                <FontAwesome key={i} name="star" size={props.size} />
            )}
        </div>
    );
}

export default Stars;