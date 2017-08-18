import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from './components/game';


class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>    
        );
    }
}

export default App;
