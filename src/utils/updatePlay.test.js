import { updatePlay } from './updatePlay';
import { getInitialBoard } from './getInitialBoard';
import { PLAYERX, PLAYERO } from './constants';

describe('Update Play Helper Function', () => {
  let initialBoard;
  let board4;
  let initialPlayData;
  beforeEach(() => {
    initialBoard = getInitialBoard(3);
    board4 = getInitialBoard(4);
    initialPlayData = {
      [PLAYERX]: {},
      [PLAYERO]: {},
    };
  });

  describe('Board Changes', () => {
    it('places player X in row 2, col 0', () => {
      const { board } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 0,
        board: initialBoard,
        boardSize: 3,
        position: { row: 2, col: 0 },
      });
      expect(board).toMatchObject([
        ['', '', ''],
        ['', '', ''],
        ['X', '', ''],
      ]);
    });

    it('does not places player O in row 2, col 0, as it is already occupied', () => {
      const modifiedBoard = initialBoard;
      modifiedBoard[2][0] = PLAYERX;
      const { board } = updatePlay({
        playData: initialPlayData,
        player: PLAYERO,
        count: 0,
        board: modifiedBoard,
        boardSize: 3,
        position: { row: 2, col: 0 },
      });
      expect(board).toMatchObject([
        ['', '', ''],
        ['', '', ''],
        ['X', '', ''],
      ]);
    });

    it('handles update in 4*4 board', () => {
      const { board } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 0,
        board: board4,
        boardSize: 4,
        position: { row: 0, col: 3 },
      });
      expect(board).toMatchObject([
        ['', '', '', 'X'],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ]);
    });
  });

  describe('Play Data Changes', () => {
    it('increments diagonal, antiDiagonal, row1, col1 by 1, when at center', () => {
      const { playData } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 0,
        board: initialBoard,
        boardSize: 3,
        position: { row: 1, col: 1 },
      });
      expect(playData).toMatchObject({
        [PLAYERX]: {
          row1: 1,
          col1: 1,
          diag: 1,
          antiDiag: 1,
        },
        [PLAYERO]: {},
      });
    });
  });

  describe('Winner', () => {
    it('declares X as winner when row0 is filled entirely by X', () => {
      const modifiedPlayData = initialPlayData;
      modifiedPlayData[PLAYERX]['row0'] = 2;

      const { winner } = updatePlay({
        playData: modifiedPlayData,
        player: PLAYERX,
        count: 4,
        board: initialBoard,
        boardSize: 3,
        position: { row: 0, col: 2 },
      });

      expect(winner).toEqual(PLAYERX);
    });

    it('declares X as winner when col0 is filled entirely by X', () => {
      const modifiedPlayData = initialPlayData;
      modifiedPlayData[PLAYERX]['col0'] = 2;

      const { winner } = updatePlay({
        playData: modifiedPlayData,
        player: PLAYERX,
        count: 4,
        board: initialBoard,
        boardSize: 3,
        position: { row: 2, col: 0 },
      });

      expect(winner).toEqual(PLAYERX);
    });

    it('declares X as winner when diag is filled entirely by X', () => {
      const modifiedPlayData = initialPlayData;
      modifiedPlayData[PLAYERX]['diag'] = 2;

      const { winner } = updatePlay({
        playData: modifiedPlayData,
        player: PLAYERX,
        count: 4,
        board: initialBoard,
        boardSize: 3,
        position: { row: 0, col: 0 },
      });

      expect(winner).toEqual(PLAYERX);
    });

    it('declares X as winner when anti diagonal is filled entirely by X', () => {
      const modifiedPlayData = initialPlayData;
      modifiedPlayData[PLAYERX]['antiDiag'] = 2;

      const { winner } = updatePlay({
        playData: modifiedPlayData,
        player: PLAYERX,
        count: 4,
        board: initialBoard,
        boardSize: 3,
        position: { row: 2, col: 0 },
      });

      expect(winner).toEqual(PLAYERX);
    });

    it('declares Draw when count reaches 9, for 3 * 3', () => {
      const { winner } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 8,
        board: initialBoard,
        boardSize: 3,
        position: { row: 0, col: 0 },
      });

      expect(winner).toEqual('Draw');
    });

    it('declares X as winner, for 4x4 board', () => {
      const modifiedPlayData = initialPlayData;
      modifiedPlayData[PLAYERX]['diag'] = 3;

      const { winner } = updatePlay({
        playData: modifiedPlayData,
        player: PLAYERX,
        count: 5,
        board: board4,
        boardSize: 4,
        position: { row: 2, col: 2 },
      });

      expect(winner).toEqual(PLAYERX);
    });

    it('declares draw, for 4x4 board', () => {
      const { winner } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 15,
        board: board4,
        boardSize: 4,
        position: { row: 0, col: 0 },
      });

      expect(winner).toEqual('Draw');
    });
  });

  describe('Count updates', () => {
    it('updates count when cell is not occupied', () => {
      const { count } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 2,
        board: initialBoard,
        boardSize: 3,
        position: { row: 0, col: 0 },
      });

      expect(count).toEqual(3);
    });

    it('does not update count when cell is occupied', () => {
      const modifiedBoard = initialBoard;
      modifiedBoard[0][0] = 'X';
      const { count } = updatePlay({
        playData: initialPlayData,
        player: PLAYERX,
        count: 2,
        board: modifiedBoard,
        boardSize: 3,
        position: { row: 0, col: 0 },
      });

      expect(count).toEqual(2);
    });
  });
});
