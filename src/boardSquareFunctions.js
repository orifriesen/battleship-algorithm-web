import React from 'react';
import './main.css';
import 'fontsource-roboto';

export var boardLength = window.innerWidth/5

export function Square(boardSize) {
    return (
        <span className="square" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

export function ShipSquare(boardSize) {
    return (
        <span className="shipSquare" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

export function SunkSquare(boardSize) {
    return (
        <span className="sunkSquare" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

export function HitSquare(boardSize) {
    return (
        <span className="hitSquare" style={{width: `${boardLength/boardSize}px`}}>
        </span>
    );
}

export function MissSquare(boardSize) {
    return (
        <span className="square" style={{width: `${boardLength/boardSize}px`}}>
            <span className="dot"/>
        </span>
    );
}