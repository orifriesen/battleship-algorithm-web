import React from 'react';
import './index.css';
import 'fontsource-roboto';

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
                        Ship List  <span style={{padding: 16}}><button type="button" onClick={this.removeShip} class="uk-button uk-button-default"><span uk-icon="minus"></span></button>
                                    <button type="button" onClick={this.addShip} class="uk-button uk-button-default"><span uk-icon="plus"></span></button></span>
                    </span>
                </h4>
                <div align="center">{this.state.shipInputs}</div>
            </div>
        )
    }
}

export class GameInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 10
        };
    }

    onInputChange = value => {
        this.setState({
            size: Number(document.getElementById("boardSizeInput")["value"])
        })
    }

    onSliderChange = value => {
        this.setState({
            size: Number(document.getElementById("boardSizeSlider")["value"])
        })
    }

    sendData = () => {
        this.props.getSize(this.state.size)
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
                <GetShips/>
                <button class="uk-button uk-button-default">Start Algorithm</button>
            </div>
        );
    }
}

export default GameInputs