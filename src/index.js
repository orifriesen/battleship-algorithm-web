import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';

var boardSize = 10

function Square() {
    return (
        <span className="square">
        </span>
    );
}

function SunkSquare() {
    return (
        <span className="sunkSquare">
        </span>
    );
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        return <Square 
            value = {this.state.squares[i]}
        />;
    }

    renderSunkSquare(i) {
        return <SunkSquare 
            value = {this.state.squares[i]}
        />;
    }

    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSunkSquare(0)}
            {this.renderSunkSquare(1)}
            {this.renderSunkSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

function ShipInput(props) {
    return (
        <div align="right">
            <h2 style={{fontSize:18, display: 'inline-block', fontWeight: 500}} paddingLeft="8">Ship {props.value}:</h2>
            <input type="number" class="uk-input" style={{width:88, marginLeft: 8}} min="0" placeholder="Length" min="1"/>
        </div>
    )
}

class GetShips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfShips: 0,
            shipInputs: []
        };
        this.addShip = this.addShip.bind(this)
        this.removeShip = this.removeShip.bind(this)
    }

    addShip(event) {
        this.setState({numberOfShips: this.state.numberOfShips+1});
        this.state.shipInputs.push(<ShipInput value = {this.state.numberOfShips}/>)
    }

    removeShip(event) {
        if (this.state.numberOfShips >= 1) {
            this.setState({numberOfShips: this.state.numberOfShips-1});
            this.state.shipInputs.pop(<ShipInput value = {this.state.numberOfShips}/>)
        }
    }

    render() {
        return (
            <div>
                <h4 class="uk-heading-line uk-text-center">
                    <span>
                        Ship List  <span style={{padding: 16}}><button type="button" onClick={this.addShip} class="uk-button uk-button-default"><span uk-icon="plus"></span></button>
                                    <button type="button" onClick={this.removeShip} class="uk-button uk-button-default"><span uk-icon="minus"></span></button></span>
                    </span>
                </h4>
                <div align="center">{this.state.shipInputs}</div>
            </div>
        )
    }
}

function GameInputs() {
    return(
        <div style={{maxWidth:500}}>
            <h4 class="uk-heading-line uk-text-center">
                <span>
                    Board Size
                </span>
            </h4>
            <div class="uk-text-center uk-grid-medium" uk-grid>
                <div class="uk-width-1-4" style={{display: "inline-block"}}>
                    <input class="uk-input" id="boardSizeInput" type="number" min="10" max="50" placeholder="Value" style={{display: "inline-block"}} onInput={changedInput}/>
                </div>
                <div class="uk-width-3-4" style={{display: "inline-block"}}>
                    <input class="uk-range" id="boardSizeSlider" type="range" min="10" max="50" style={{display: "inline-block"}} onInput={changedSlider}/>
                </div>
            </div>
            <br/>
            <GetShips/>
            <button class="uk-button uk-button-default">Start Algorithm</button>
        </div>
    );
}

function changedInput() {
    boardSize = Number(document.getElementById("boardSizeInput")["value"])
    document.getElementById("boardSizeSlider").value = boardSize
}

function changedSlider() {
    boardSize = Number(document.getElementById("boardSizeSlider")["value"])
    document.getElementById("boardSizeInput").value = boardSize
}

class Game extends React.Component {
    render() {
        return (
            <html>
                <div align="center">
                    <div align="center" style={{marginBottom: 64}}>
                        <h3 style = {{paddingTop: 20, fontSize: 32, fontFamily: "Roboto", fontWeight: 4, color: 'GrayText', lineHeight: 0}}>Battleship Algorithm</h3>
                        <h3 style = {{fontSize: 16, fontFamily: "Roboto", fontWeight: 4, color: 'lightgray', lineHeight: 0}}>By Ori Friesen</h3>
                    </div>
                    <div style={{maxWidth: 2000}}>
                        <div align="center">
                            <div align="center" style={{paddingRight: 1000}}>
                                <Board/>
                            </div>
                        </div>
                        <div align="center" style={{paddingLeft: 500, maxWidth: 500, marginTop: -133}}>
                            <GameInputs/>
                        </div>
                    </div>
                </div>
            </html>
        );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  