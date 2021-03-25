import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';

function Square(props) {
    return (
        <button className="square" onClick = {props.onClick}>
        {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares [a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square 
            value = {this.state.squares[i]}
            onClick = {() => this.handleClick(i)}
        />;
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
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

class ShipInput extends React.Component {
    render(value) {
        return (
            <div>
                <h2>Ship {value}:</h2>
                <label>Size: </label>
                <input type="number"/><br/><br/>
            </div>
        )
    }
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
        this.setState({numberOfShips: this.state.numberOfShips-1});
        this.state.shipInputs.pop(<ShipInput value = {this.state.numberOfShips}/>)
    }

    render() {
        return (
            <div>
                <button type="button" onClick={this.addShip}>Add Ship</button>
                <button type="button" onClick={this.removeShip}>Remove Ship</button>
                <div>{this.state.shipInputs}</div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <html>
                <div>
                    <div align="center">
                        <h3 style = {{paddingTop: 20, fontSize: 32, fontFamily: "Roboto", fontWeight: 4, color: 'GrayText', lineHeight: 0}}>Battleship Algorithm</h3>
                        <h3 style = {{fontSize: 16, fontFamily: "Roboto", fontWeight: 4, color: 'lightgray', lineHeight: 0}}>By Ori Friesen</h3>
                    </div>
                    <div className="game" align = "left">
                        <div className="game-board">
                        <Board />
                        </div>
                        <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                        </div>
                    </div>
                </div>
                <GetShips/>
            </html>
        );
    }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  