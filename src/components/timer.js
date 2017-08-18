import React from 'react';


class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        secondsRemaining: 0
    };

    tick = () => {
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
            this.props.timedOut();
        }
    };

    start = () => {
        this.setState({
            secondsRemaining: this.props.secondsRemaining
        });
        this.interval = setInterval(this.tick, 1000);
    }

    stop = () => {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        this.stop();
    }

    getClassName = () => {
        let c = ["btn"];
        let sr = this.state.secondsRemaining;
        //this is a comment

        if (sr <= 15) {
            c.push("btn-danger");
        } else if (sr <= 30) {
            c.push("btn-warning");
        } else {
            c.push("btn-primary");
        }
        console.log(`classes are ${c.join(' ')}`);

        return c.join(' ');
    }

    render() {
        return (
            <div className="text-center">
                <label className="btn btn-warning">
                    {this.state.secondsRemaining.toMMSS()}</label>
            </div>
        );
    }
}

export default Timer;