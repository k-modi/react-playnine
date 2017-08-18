import React from 'react';
import Stars from './stars';

const Moves = (props) => {

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <td colSpan="4">Moves</td>
          </tr>
          <tr>
            <td>#</td>
            <td>Stars</td>
            <td>Chosen</td>
            <td>Available</td>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, i) => {
            return <tr key={"row_" + i}>
              <td>{i + 1}</td>
              <td width="30%"><Stars numberOfStars={item.stars} /></td>
              <td width="100px">{item.selectedNumbers.map((num, i) =>
                <span key={i}>
                  {num}
                </span>)}
              </td>
              <td width="125px">{item.availableNumbers.map((num, i) =>
                <span key={i}>
                  {num}
                </span>)}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );

};

export default Moves;
