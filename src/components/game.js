import React from 'react';
import _ from 'lodash';
import Stars from './stars';
import CheckerButton from './checkerButton';
import Answer from './answer';
import Numbers from './numbers';
import DoneFrame from './doneFrame';
import Timer from './timer';
import Moves from './moves';

var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

Number.prototype.toMMSS = function () {
  var sec_num = this; // don't forget the second param
  //var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - (minutes * 60);

  //    if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes + ':' + seconds;
};

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    static randomNumber = ({ randomNumberOfStars }) => {
        let newNum;
        let current = randomNumberOfStars || 0;
        do {
            newNum = 1 + Math.floor(Math.random() * 9);
        }
        while (newNum === current)

        return newNum;
    };

    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        randomNumberOfStars: Game.randomNumber(this),
        answerIsCorrect: null,
        redrawsLeft: 10,
        doneStatus: null,
        secondsRemaining: 60,
        history: []
    });

    timer = null;

    state = Game.initialState();

    resetGame = () => {
        this.setState(Game.initialState());
        this.timer.start();
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }

        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }));
    };

    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(n => n !== clickedNumber),
            answerIsCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars ===
            prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                this.timer.stop();
                return { doneStatus: 'Done. Nice!' };
            }

            if (prevState.redrawsLeft === 0 && !this.possibleSolutions(prevState)) {
                this.timer.stop();
                return { doneStatus: 'Game Over!' };
            }

            return { doneStatus: null };
        });
    }

    remainingNumbers = (usedNumbers) => {
        return _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1);
    }

    possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {

        return possibleCombinationSum(this.remainingNumbers(usedNumbers), randomNumberOfStars);
    }

    acceptAnswer = () => {

        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(prevState),
            history: prevState.history.concat({
                selectedNumbers: prevState.selectedNumbers,
                stars: prevState.randomNumberOfStars,
                availableNumbers: this.remainingNumbers(prevState.usedNumbers)
            })
        }), this.updateDoneStatus);
    };

    redraw = () => {
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(prevState),
            selectedNumbers: [],
            answerIsCorrect: null,
            redrawsLeft: prevState.redrawsLeft - 1,
            history: prevState.history.concat({
                selectedNumbers: [],
                stars: prevState.randomNumberOfStars,
                availableNumbers: this.remainingNumbers(prevState.usedNumbers)
            })
        }), this.updateDoneStatus);
    };

    timedOut = () => {
        this.setState(() => ({
            doneStatus: 'Time up!',
            selectedNumbers: [],
        }));
    };

    render() {
        const {
    	selectedNumbers,
            usedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            redrawsLeft,
            doneStatus,
            secondsRemaining,
            history
    } = this.state;

        return (
            <div className="container col-lg-push-2 col-lg-9">
                <div className="row">
                    <div className="col-sm-5">
                        <h3 className="text-center">Play Nine</h3>
                        <hr />
                        <div>
                            <div className="row text-center">
                                <Timer timedOut={this.timedOut}
                                    secondsRemaining={secondsRemaining}
                                    ref={(timerRef) => { this.timer = timerRef; }} />
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-5">
                                    <Stars numberOfStars={randomNumberOfStars} size="lg" />
                                </div>
                                <div className="col-sm-2">
                                    <CheckerButton selectedNumbers={selectedNumbers}
                                        checkAnswer={this.checkAnswer}
                                        answerIsCorrect={answerIsCorrect}
                                        acceptAnswer={this.acceptAnswer}
                                        redraw={this.redraw}
                                        redrawsLeft={redrawsLeft}
                                        gameOver={doneStatus !== null}/>
                                </div>
                                <div className="col-sm-5">
                                    <Answer selectedNumbers={selectedNumbers}
                                        deselectNumber={this.deselectNumber} />
                                </div>
                            </div>
                            <hr />
                            {
                                doneStatus ?
                                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} /> :
                                    <Numbers selectedNumbers={selectedNumbers}
                                        usedNumbers={usedNumbers}
                                        selectNumber={this.selectNumber}
                                        deselectNumber={this.deselectNumber} />
                            }
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <br />
                        <Moves items={history} />
                    </div>
                </div>
            </div>    
        );
    }
}

export default Game;