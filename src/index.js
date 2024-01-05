import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import GameInputs from './gameInputs.js';
import GameBoard from './gameBoard.js';
import AlgorithmVisualization from './algorithmVisualization.js';
import 'fontsource-roboto';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 10,
            board: [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]
        };
    }

    updateBoard = (value) => {
        this.setState({boardSize: value.length}, this.setState({board: value}));
    }

    nextStep(event) {
        console.log("next step");
    }

    lastStep(event) {
        console.log("last step");
    }

    static startAlgorithm() {
        console.log("start algorithm");
        document.getElementById("lastStep").disabled = false;
        document.getElementById("nextStep").disabled = false;
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
                                <div>
                                    <div style={{display: "inline-block"}}>
                                        <h4 class="uk-text-center"style={{paddingRight: 274}}>
                                            <span>
                                                Game Board:
                                            </span>
                                        </h4>
                                        <div style={{marginTop: -16}}>
                                            <GameBoard size = {this.state.boardSize} board = {this.state.board}/>
                                        </div>
                                    </div>
                                    <div style={{display: "inline-block", paddingLeft: 16}}>
                                        <h4 class="uk-text-center"style={{paddingRight: 178}}>
                                            <span>
                                                Algorithm Visualization:
                                            </span>
                                        </h4>
                                        <div style={{marginTop: -16}}>
                                            <AlgorithmVisualization size = {this.state.boardSize}/>
                                        </div>
                                        <div style={{marginTop: -16}}>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="uk-text-center"style={{paddingTop: 16}}>
                                        <button type="button" onClick={this.lastStep} id="lastStep" disabled="true" class="uk-button uk-button-default uk-button-small"><span uk-icon="chevron-left"></span></button>
                                        <span style={{paddingRight: 64, paddingLeft: 64}}>
                                            Algorithm Steps
                                        </span>
                                        <button type="button" onClick={this.nextStep} id="nextStep" disabled="true" class="uk-button uk-button-default uk-button-small"><span uk-icon="chevron-right"></span></button>
                                    </h4>
                                </div>
                            </div>
                            
                        </div>
                        <div align="center" style={{paddingLeft: 750, maxWidth: 500, marginTop: -window.innerWidth/5}}>
                            <GameInputs updateBoard={this.updateBoard}/>
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
  