import React, {useState} from 'react';
import './main.css';
import './index.js';
import 'fontsource-roboto';

class InputList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputList: [],
            errorMessage: ""
        };
    }

    sendData = () => {
        if(this.state.inputList.length == 0) {
            this.setState({errorMessage: "Error: Need at least one ship"});
            return;
        }
        for(const input of this.state.inputList) {
            if(input.shipLength == "" || input.shipLength <= 0 || input.shipLength > this.props.size) {
                this.setState({errorMessage: "Error: Make sure all ships have a valid size"});
                return;
            }
        }
        this.setState({errorMessage: ""});
        this.props.randomize(this.state.inputList);
    }
   
    // handle input change
    handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...this.state.inputList];
      list[index][name] = value;
      this.setState({inputList: list});
    };
   
    // handle click event of the Remove button
    handleRemoveClick = index => {
      const list = [...this.state.inputList];
      list.splice(index, 1);
      this.setState({inputList: list});
    };
   
    // handle click event of the Add button
    handleAddClick = () => {
        this.setState({inputList: [...this.state.inputList, { shipLength: "" }]});
    };

    startAlgorithm = () => {
        if(this.state.inputList.length == 0) {
            this.setState({errorMessage: "Error: Board needs to be randomized before the algorithm can start"});
            return;
        }
        for(const input of this.state.inputList) {
            if(input.shipLength == "" || input.shipLength <= 0) {
                this.setState({errorMessage: "Error: Board needs to be randomized before the algorithm can start"});
                return;
            }
        }
        this.setState({errorMessage: ""});
        this.props.startAlgorithm();

    }
   
    render() {

        return (
        <div>
            <h4 class="uk-heading-line uk-text-center">
                <span>
                    Ship List  <span style={{padding: 16}}>
                        <button type="button" onClick={this.handleAddClick} class="uk-button uk-button-default"><span uk-icon="plus"></span></button>
                    </span>
                </span>
            </h4>
            {this.state.inputList.map((x, i) => {
            return (
                <div className="box" align="right">
                <h2 style={{fontSize:18, display: 'inline-block', fontWeight: 500}} paddingLeft="8">Ship {i}:</h2>
                <input
                    class="uk-input"
                    style={{width:88, marginLeft: 8}}
                    name="shipLength"
                    placeholder="Length"
                    type="number"
                    value={x.shipLength}
                    onChange={e => this.handleInputChange(e, i)}
                />
                    {<button
                    class="uk-button-default"
                    style={{borderWidth: 0, cursor: 'pointer'}}
                    onClick={() => this.handleRemoveClick(i)}><span uk-icon="close"></span></button>}
                </div>
            );
            })}
            <button class="uk-button uk-button-default" id="randomizeButton" onClick={this.sendData}>Randomize Board</button>
            <button class="uk-button uk-button-default" id="startButton" onClick={this.startAlgorithm}>Start Algorithm</button>
            {this.state.errorMessage && <div style={{color: 'red'}}> {this.state.errorMessage} </div>}
        </div>
        );
    }
}

export class GameInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 10,
            inputList: [],
            shipList: [],
            board: [[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0]]
        };
    }

    randomizeBoard = (value) => {
        this.setState({board: this.changeBoardSize(this.state.size)}, function () {
            this.setState({shipList: []}, function () {
                console.log("randomize board");
                this.setState({inputList: value}, function () {
                    for(const input of this.state.inputList) {
                        this.randomizeShipPlacement(input);
                    }
            
                    console.log(this.state.board);
                    console.log(this.state.shipList);

                    this.sendData();
                });
            });
        });
    }

    onInputChange = value => {
        this.setState({
            size: Number(document.getElementById("boardSizeInput")["value"])
        }, this.sendData);
        this.setState({board: this.changeBoardSize(this.state.size)}, this.sendData);
    }

    onSliderChange = value => {
        this.setState({
            size: Number(document.getElementById("boardSizeSlider")["value"])
        }, this.sendData);
        this.setState({board: this.changeBoardSize(this.state.size)}, this.sendData);
    }

    changeBoardSize(size) {
        var board = [];

        for(var i = 0; i < size; i++) {
            let row = [];

            for(var u = 0; u < size; u++) {
                row.push(0);
            }

            board.push(row);
        }

        return board;
    }

    isCollision(shipCoords, shipList) {
        if(shipList == []) {
            return false;
        }
        for(var i = 0; i < shipList.length; i++) {
            for(const coord of shipList[i]) {
                for(const newCoord of shipCoords) {
                    if(coord[0] == newCoord[0] && coord[1] == newCoord[1]) {;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    addToBoard(shipCoords) {
        var newBoard = this.state.board;

        for(const coords of shipCoords) {
            newBoard[coords[0]][coords[1]] = 1;
        }

        this.setState({board: newBoard});
    }

    randomizeShipPlacement(ship) {
        var shipCoords = [];
        const isVerticle = Math.random() > 0.5 ? true : false;

        const maxX = this.state.size - ship.shipLength - 1;
        const startingX = Math.floor(Math.random() * (maxX + 1));
        const startingY = Math.floor(Math.random() * this.state.size);

        if(isVerticle == true) {
            for(var i = 0; i < ship.shipLength; i++) {
                shipCoords.push([startingX + i, startingY]);
            }
        }
        else {
            for(var i = 0; i < ship.shipLength; i++) {
                shipCoords.push([startingY, startingX + i]);
            }
        }

        if(this.isCollision(shipCoords, this.state.shipList) == false) {
            var newShipList = this.state.shipList;
            newShipList.push(shipCoords);
            this.setState({shipList: newShipList});
            this.addToBoard(shipCoords);
        }
        else {
            this.randomizeShipPlacement(ship);
        }
    }

    startAlgorithm = () => {
        
    }

    sendData = () => {
        this.props.updateBoard(this.state.board);
    }

    render() {
        return(
            <div style={{maxWidth:500}}>
                <h4 class="uk-heading-line uk-text-center">
                    <span>
                        Board Size
                    </span>
                </h4>
                <div class="uk-text-center uk-grid-medium" uk-grid>
                    <div class="uk-width-1-4" style={{display: "inline-block"}}>
                        <input class="uk-input" id="boardSizeInput" type="number" min="10" max="50" value={this.state.size} placeholder="Value" style={{display: "inline-block"}} onInput={e => {this.onInputChange(e.target.value); this.sendData()}}/>
                    </div>
                    <div class="uk-width-3-4" style={{display: "inline-block"}}>
                        <input class="uk-range" id="boardSizeSlider" type="range" min="10" max="50" defaultValue="10" value={this.state.size} style={{display: "inline-block"}} onChange={value => {this.onSliderChange(value); this.sendData()}}/>
                    </div>
                </div>
                <br/>
                <InputList randomize={this.randomizeBoard} startAlgorithm={this.startAlgorithm} size={this.state.size}/>
                <div style={{ marginTop: 20 }}>{JSON.stringify(this.state.inputList)}</div>
            </div>
        );
    }
}

export default GameInputs