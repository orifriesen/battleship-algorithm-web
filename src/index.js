import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameInputs from './gameInputs.js'
import 'fontsource-roboto';

var boardLength = window.innerWidth/5

function Square(boardSize) {
    return (
        <span className="square" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

function SunkSquare(boardSize) {
    return (
        <span className="sunkSquare" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

function HitSquare(boardSize) {
    return (
        <span className="hitSquare" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

function MissSquare(boardSize) {
    return (
        <span className="square" style={{width: `${boardLength/boardSize}px`}}>
            <span className="dot"/>
        </span>
    );
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.makeRow = this.makeRow.bind(this)
        this.makeBoard = this.makeBoard.bind(this)
    }

    makeRow(column) {
        var row = [];
        for(var i = 0; i < this.props.size; i++) {
            if(column === 20) {
                row.push(SunkSquare(this.props.size));
            }
            else{
                row.push(Square(this.props.size));
            }
        }
        return (<div style={{display: 'block', whiteSpace: 'nowrap', height: `${boardLength/this.props.size}px`, width: `${boardLength}px`}}>{row}</div>);
    }

    makeBoard() {
        var board = [];
        for(var i = 0; i < this.props.size; i++) {
            board.push(this.makeRow(i));
        }
        return (<div>{board}</div>);
    }

    render() {
        return (
            <div>{this.makeBoard()}</div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 10
        };
    }

    updateBoard = (value) => {
        this.setState({boardSize: value})
    }

    render() {
        return (
            <html>
                <div align="center">
                    <div align="center" style={{marginBottom: 64}}>
                        <h3 style = {{paddingTop: 20, fontSize: 32, fontFamily: "Roboto", fontWeight: 4, color: 'GrayText', lineHeight: 0}}>Battleship Algorithm</h3>
                        <h3 style = {{fontSize: 16, fontFamily: "Roboto", fontWeight: 4, color: 'lightgray', lineHeight: 0}}>By Ori Friesen</h3>
                    </div>
                    <div style={{maxWidth: 2000, maxHeight: 2000, display: 'relative'}}>
                        <div align="center">
                            <div align="center" style={{paddingRight: 750}}>
                                <div style={{display: "inline-block"}}>
                                    <h4 class="uk-text-center"style={{paddingRight: 274}}>
                                        <span>
                                            Game Board:
                                        </span>
                                    </h4>
                                    <div style={{marginTop: -16}}>
                                        <Board size = {this.state.boardSize}/>
                                    </div>
                                </div>
                                <div style={{display: "inline-block", paddingLeft: 16}}>
                                    <h4 class="uk-text-center"style={{paddingRight: 178}}>
                                        <span>
                                            Algorithm Visualization:
                                        </span>
                                    </h4>
                                    <div style={{marginTop: -16}}>
                                        <Board size = {this.state.boardSize}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div align="center" style={{paddingLeft: 750, maxWidth: 500, marginTop: -window.innerWidth/5}}>
                            <GameInputs getSize={this.updateBoard}/>
                        </div>
                    </div>
                </div>
            </html>
        );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game/>,
    document.getElementById('root')
  );
  