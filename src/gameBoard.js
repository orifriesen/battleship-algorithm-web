import React from 'react';
import {Square, HitSquare, boardLength, MissSquare, ShipSquare, SunkSquare} from './boardSquareFunctions.js';
import './main.css';
import 'fontsource-roboto';

export class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    initBoard(boardNums) {
        var board = new Array();

        for(var i = 0; i < boardNums.length; i++) {
            board[i] = new Array(boardNums.length);
            for(var u = 0; u < boardNums.length; u++) {
                if(boardNums[i][u] == 0) {
                    board[i][u] = Square(boardNums.length);
                }
                else if(boardNums[i][u] == 1) {
                    board[i][u] = ShipSquare(boardNums.length);
                }
            }
        }

        return board;
    }

    render() {
        var board = this.initBoard(this.props.board);

        var renderBoard = [];

        for(var i = 0; i < this.props.size; i++) {
            renderBoard.push(
                <div style={{display: 'block', whiteSpace: 'nowrap', height: `${boardLength/this.props.size}px`, width: `${boardLength}px`}}>{board[i]}</div>
            );
        }

        return (
            renderBoard
        );
    }
}

export default GameBoard