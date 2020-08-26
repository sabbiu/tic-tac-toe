import React, { useReducer, useEffect } from 'react';
import Square from './Square';
import getInitialBoard from './utils/getInitialBoard';
import {
  PLAYERX,
  PLAYERO,
  BOARD_SIZES,
  INITIAL_BOARD_SIZE,
} from './utils/constants';
import togglePlayer from './utils/togglePlayer';
import updatePlay from './utils/updatePlay';

const rowStyle = {
  display: 'flex',
};

const boardStyle = {
  backgroundColor: '#eee',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
  marginTop: '10px',
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
};

const types = {
  initialize: 'initialize',
  update_board: 'update_board',
  update_current_player: 'update_current_player',
};

const initialState = {
  boardSize: INITIAL_BOARD_SIZE,
  board: getInitialBoard(INITIAL_BOARD_SIZE),
  currentPlayer: PLAYERX,
  count: 0,
  playData: {
    [PLAYERX]: {},
    [PLAYERO]: {},
  },
  winner: '',
};

function reducer(state, action) {
  switch (action.type) {
    case types.update_board:
      return {
        ...state,
        ...updatePlay({
          playData: state.playData,
          player: state.currentPlayer,
          count: state.count,
          board: state.board,
          boardSize: state.boardSize,
          position: action.payload,
        }),
      };
    case types.update_current_player:
      return {
        ...state,
        currentPlayer: togglePlayer(state.currentPlayer),
      };

    case types.initialize:
      return {
        ...initialState,
        boardSize: action.payload || state.boardSize,
        board: getInitialBoard(action.payload || state.boardSize),
      };
    default:
      return state;
  }
}

function Board() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleBoardSizeChange = (event) => {
    dispatch({
      type: types.initialize,
      payload: +event.target.value,
    });
  };

  const handleSquareClick = (row, col) => {
    if (!state.board[row][col] && !state.winner)
      dispatch({
        type: types.update_board,
        payload: { row, col },
      });
  };

  const handleReset = () => dispatch({ type: types.initialize });

  useEffect(() => {
    if (state.count && !state.winner) {
      dispatch({ type: types.update_current_player });
    }
  }, [state.board]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>
        Next player: {!state.winner ? state.currentPlayer : 'None'}
      </div>
      <div className="winner" style={instructionsStyle}>
        Winner: {state.winner || 'None'}
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div>
        <label>Board Size: </label>
        <select value={state.boardSize} onChange={handleBoardSizeChange}>
          {BOARD_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div style={boardStyle}>
        {state.board.map((row, i) => (
          <div key={`r${i}`} className="board-row" style={rowStyle}>
            {row.map((cell, j) => (
              <Square
                key={`r${i}c${j}`}
                value={cell}
                handleSquareClick={handleSquareClick.bind(this, i, j)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
