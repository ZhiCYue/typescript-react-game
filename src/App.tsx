import React, { Component } from 'react'
import './App.css'

type ONGOING_GAME = -1
const ONGOING_GAME = -1

enum Player {
    None = 0,
    One = 1,
    Two = 2
}

interface IState {
    board: Player[],
    nextPlayerTurn: Player,
    gameIsWon: Player | ONGOING_GAME
}

class App extends Component<{}, IState> {

    state = {
        board: [
            Player.None, Player.None, Player.None,
            Player.None, Player.None, Player.None,
            Player.None, Player.None, Player.None
        ],
        nextPlayerTurn: Player.One,
        gameIsWon: ONGOING_GAME
    }

    public checkGameIsOver = (board: Player[]) => {
        if(board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) {
            return board[0]
        } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) {
            return board[3]
        } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) {
            return board[6]
        }
        // ...

        for(const player of board) {
            if(player === Player.None) {
                return ONGOING_GAME
            }
        }

        return Player.None
    }

    public handleCellClick = (index: number) => {
        const { board, nextPlayerTurn, gameIsWon } = this.state

        if(gameIsWon !== ONGOING_GAME || board[index] !== Player.None) return

        let newBoard = board.slice()
        newBoard[index] = nextPlayerTurn

        let newGameIsWon = this.checkGameIsOver(newBoard)

        this.setState({
            board: newBoard,
            nextPlayerTurn: 3 - nextPlayerTurn,
            gameIsWon: newGameIsWon
        })
    }

    public renderCell = (index: number) => {
        const { board } = this.state
        return (
            <div className="cell" data-player={board[index]} key={index} onClick={() => { this.handleCellClick(index) }}></div>
        )
    }

    public renderBoard = () => {
        const { board } = this.state
        return (
            <div className="board-container">
                { board.map((value, key) => this.renderCell(key))}
            </div>
        )
    }

    public renderStatus = () => {
        const { gameIsWon } = this.state
        const winningText = gameIsWon !== Player.None ? `Player ${gameIsWon} won` : "game is draw"
        return (
            <div className="game-text">
                { "player 1 is yellow" } <br/>
                { "player 2 is orange" } <br/>
                { gameIsWon === ONGOING_GAME ? "game is going" : winningText }
            </div>
        )
    }

    render() {
        return (
            <div className="App">
                { this.renderBoard() }
                { this.renderStatus() }
            </div>
        );
    }
}

export default App
