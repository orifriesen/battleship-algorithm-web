import React from 'react';
import {Square, HitSquare, boardLength} from './boardSquareFunctions.js';
import './main.css';

export class AlgorithmVisualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardSize: 10
        };
    }

    makeRow() {
        var row = new Array(this.props.size);
        for(var i = 0; i < this.props.size; i++) {
            row[i] = (Square(this.props.size));
        }
        return (<div style={{display: 'block', whiteSpace: 'nowrap', height: `${boardLength/this.props.size}px`, width: `${boardLength}px`}}>{row}</div>);
    }

    makeBoard() {
        var board = new Array(this.props.size);
        for(var i = 0; i < this.props.size; i++) {
            board[i] = (this.makeRow(i));
        }
        return (<div>{board}</div>);
    }

    render() {
        return (
            <div>{this.makeBoard()}</div>
        );
    }
}

export default AlgorithmVisualization