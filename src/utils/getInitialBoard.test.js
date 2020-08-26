import { getInitialBoard } from './getInitialBoard';

describe('Get Initial Board Helper Function', () => {
  const board = getInitialBoard(3);
  const board4 = getInitialBoard(4);

  it('checks row of matrix', () => {
    expect(board.length).toEqual(3);
  });

  it('checks column of matrix', () => {
    expect(board[0].length).toEqual(3);
  });

  it('checks the board', () => {
    expect(board).toMatchObject([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  });

  it('checks 4*4 board', () => {
    expect(board4).toMatchObject([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ]);
  });
});
