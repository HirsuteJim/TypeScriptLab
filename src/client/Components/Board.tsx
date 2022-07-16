import React, { Component } from 'react';
import Row from './Row';
import { BoardText, BoardContent, Scoreboard, Player } from './../../types';


type BoardState = {
  board: BoardContent;
  currentPlayer: Player;
  gameOver: boolean;
  message: string;
  scoreboard: Scoreboard;
};


class Board extends Component<{}, BoardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      board: this.newBoard(),
      currentPlayer: 'X',
      gameOver: false,
      message: '',
      scoreboard: {X: 0, O: 0},
    };

    // these methods need to be bound to the context of `this` since
    // these will be passed into event handlers and called from outside the object
    // where the context of `this` would be otherwise different
    this.resetBoard = this.resetBoard.bind(this);
    this.handleBoxClick = this.handleBoxClick.bind(this);
  }

  componentDidMount() {
    this.getScores();
  }

  componentDidUpdate() {
    this.checkForWinner();
  }

  /**
   * @method newBoard
   * @description - returns a blank BoardContent array,
   *  for the start of a new game
   */
  newBoard(): BoardContent {
    return [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ];
  }

  /**
   * @method resetBoard
   * @description - sets to board object to be all '-',
   *  and sets gameOver and message to default state
   */
  resetBoard(): void {
    this.setState({
      gameOver: false,
      board: this.newBoard(),
      message: '',
    });
  }

  /**
   * @method checkForWinner
   * @description - checks to see if either player has filled a row
   *  if so, ends the game and updates the message to declare winner
   */
  checkForWinner(): void {
    const {board, gameOver, currentPlayer} = this.state;

    // helper function to check if board is filled
    const spacesLeft = (): boolean => {
      for (let i of board) {
        if (i.includes('-')) return true;
      }
      return false;
    };

    if (!gameOver) {
      // win conditions: matching rows, columns, or diagonals, that are not empty('-')
      if (
        (board[0][0] === board[0][1] &&
          board[0][1] === board[0][2] &&
          board[0][2] !== '-') ||
        (board[1][0] === board[1][1] &&
          board[1][1] === board[1][2] &&
          board[1][2] !== '-') ||
        (board[2][0] === board[2][1] &&
          board[2][1] === board[2][2] &&
          board[2][2] !== '-') ||
        (board[0][0] === board[1][0] &&
          board[1][0] === board[2][0] &&
          board[2][0] !== '-') ||
        (board[0][1] === board[1][1] &&
          board[1][1] === board[2][1] &&
          board[2][1] !== '-') ||
        (board[0][2] === board[1][2] &&
          board[1][2] === board[2][2] &&
          board[2][2] !== '-') ||
        (board[0][0] === board[1][1] &&
          board[1][1] === board[2][2] &&
          board[2][2] !== '-') ||
        (board[2][0] === board[1][1] &&
          board[1][1] === board[0][2] &&
          board[0][2] !== '-')
      ) {
        // winner is the person who's turn was previous
        const winner: Player = currentPlayer === 'X' ? 'O' : 'X';

        this.setState({
          gameOver: true,
          message: `Player ${winner} wins!`,
        });
          console.log('🔴🟠🟡🟢🔵🟣🔴🟠🟡🟢🔵🟣 | file: Board.tsx | line 118 | Board | checkForWinner | winner', winner);

        this.getScores('POST', JSON.stringify({winner}));

        // draw condition: no '-' remaining in board without above win condition triggering
      } else if (!spacesLeft()) {
        this.setState({
          gameOver: true,
          message: 'Draw!',
        });
      }
    }
  }

  getScores(parm1?: string, parm2?: string) {
    let header = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    };
    if (!parm1) {
      header = {
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
      };
      parm1 = 'GET';
    }

    console.log('MAKING REQUEST FOR ' + parm1 + ' WITH DATA: ', parm2);
    fetch('http://127.0.0.1:3000/api', {
      method: parm1,
      // headers: header,
      body: parm2,
      // body: {"winner": "X"},
    })
      .then((response) => response.json())
      .then((data: Scoreboard) => {
        console.log(
          '🔴🟠🟡🟢🔵🟣 | file: Board.tsx | line 140 | Board | .then | data',
          data
        );
      })
      .catch((err) => {
        console.log('ERROR: ', err.message);
      });
  }

  handleBoxClick(key): void {
    console.log(
      '🔴🟠🟡🟢🔵🟣 | file: Board.tsx | line 134 | Board | handleBoxClick | key',
      key
    );
    // const boardCopy: BoardContent = [...this.state.board];
    const boardCopy: BoardContent = [...this.state.board];
    /*
    [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ]
    */ //Cur player
    const curPlayer: Player = this.state.currentPlayer;

    if (boardCopy[key[1]][key[3]] !== '-') return;

    //Update correct board
    boardCopy[key[1]][key[3]] = curPlayer; //x or o

    //! Here we actually set the X or O in da box.
    // this.setState({ board: boardCopy, currentPlayer: 'X' });
    this.setState({board: boardCopy});
    this.setState({
      board: boardCopy,
      currentPlayer: curPlayer === 'X' ? 'O' : 'X',
    });

    //! NOW is's time change to the NEXT playerayert
    // this.setState({currentPlayer})
  }

  render() {
    // insert logic to render rows here

    // Destructure scores for X and O from state so that they can individually be rendered below
    const {X, O}: Scoreboard = this.state.scoreboard;
    const board: BoardContent = this.state.board;

    const rows: JSX.Element[] = [];
    for (let i = 0; i < 3; i++) {
      rows.push(
        <Row row={i} handleBoxClick={this.handleBoxClick} content={board[i]} />
      );
    }

    return (
      <div className='board'>
        {rows}
        <button id='reset' onClick={this.resetBoard}>
          Reset
        </button>
        {/* The && operator here makes it so that the following JSX is only added if the expression is truthy */}
        {this.state.gameOver && <p>{this.state.message}</p>}
        <h4>Scoreboard:</h4>
        <p>X: {X}</p>
        <p>O: {O} </p>
      </div>
    );
  }
}

export default Board;