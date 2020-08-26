import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import Board, { reducer, types } from './Board';
import { INITIAL_BOARD_SIZE, PLAYERX, PLAYERO } from './utils/constants';
import { getInitialBoard } from './utils/getInitialBoard';
import * as updatePlayModule from './utils/updatePlay';

describe('Board Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Board />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('renders correctly', () => {
  //   const rendered = renderer.create(<Board />);
  //   expect(rendered.toJSON()).toMatchSnapshot();
  // });

  describe('reducer', () => {
    let initialState;
    beforeEach(() => {
      initialState = {
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
    });

    it('toggles current player', () => {
      const state = reducer(initialState, {
        type: types.update_current_player,
      });

      expect(state.currentPlayer).toEqual(PLAYERO);
    });

    it('resets the states', () => {
      const modifiedState = { ...initialState };
      modifiedState.currentPlayer = PLAYERO;
      modifiedState.count = 3;
      modifiedState.winner = 'Draw';

      expect(reducer(modifiedState, { type: types.initialize })).toEqual(
        initialState
      );
    });

    it('resets the states and changes boardSize', () => {
      const inputModifiedState = { ...initialState };
      inputModifiedState.currentPlayer = PLAYERO;
      inputModifiedState.count = 3;
      inputModifiedState.winner = 'Draw';
      inputModifiedState.boardSize = 4;
      inputModifiedState.board = getInitialBoard(4);

      const outputModifiedState = { ...initialState };
      outputModifiedState.boardSize = 5;
      outputModifiedState.board = getInitialBoard(5);

      expect(
        reducer(inputModifiedState, {
          type: types.initialize,
          payload: 5,
        })
      ).toEqual(outputModifiedState);
    });

    it('updates the board accordingly', () => {
      const spy = jest.spyOn(updatePlayModule, 'updatePlay');
      spy.mockReturnValue({ count: 2 });
      const modifiedInitialState = { ...initialState };
      modifiedInitialState.count = 2;
      expect(reducer(initialState, { type: types.update_board })).toMatchObject(
        modifiedInitialState
      );
    });
  });
});
