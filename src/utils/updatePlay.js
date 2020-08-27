import { PLAYERX, PLAYERO } from './constants';

/**
 * Returns necessary updates after player clicks an empty cell
 *
 * Inputs
 * - playData: a data object that stores each player's matches in the following format
 *    -> rown = stores number of cell occupied by player in nth row
 *    -> coln = stores number of cell occupied by player in nth column
 *    -> diag = stores number of cell occupied by player diagonally
 *    -> antiDiag = stores number of cell occupied by player in the opposite diagonal
 * - player: current player, either 'X' or 'O'
 * - count: total number of plays by both players
 * - board: n * n matrix
 * - boardSize: n
 * - position:
 *    -> row = current clicked row
 *    -> col = current clicked column
 *
 * Operations
 * - if valid cell, count gets increased by 1
 * - if playData has any of its element equal to boardSize then,
 *   current player is declared winner
 * - if count equals boardSize squared and winner is not declared yet then,
 *   winner is set to 'Draw'
 *
 * Outputs:
 * - count
 * - board
 * - winner: 'X' or 'O' or 'Draw'
 * - playData
 */
export function updatePlay({
  playData,
  player,
  count,
  board,
  boardSize,
  position,
}) {
  let winner = '';
  const newPlayData = {
    [PLAYERX]: { ...playData[PLAYERX] },
    [PLAYERO]: { ...playData[PLAYERO] },
  };

  let newCount = count;

  const newBoard = board.map((row, i) =>
    row.map((cell, j) => {
      if (i === position.row && j === position.col && !cell) {
        newCount++;
        // row match
        let rowCurrent = newPlayData[player][`row${i}`] || 0;
        rowCurrent += 1;
        newPlayData[player][`row${i}`] = rowCurrent;
        if (rowCurrent === boardSize) {
          winner = player;
        }
        // col match
        let colCurrent = newPlayData[player][`col${j}`] || 0;
        colCurrent += 1;
        newPlayData[player][`col${j}`] = colCurrent;
        if (colCurrent === boardSize) {
          winner = player;
        }
        // diag match
        if (i === j) {
          let diagCurrent = newPlayData[player][`diag`] || 0;
          diagCurrent += 1;
          newPlayData[player][`diag`] = diagCurrent;
          if (diagCurrent === boardSize) {
            winner = player;
          }
        }
        // anti diag match
        if (i + j === boardSize - 1) {
          let antiDiagCurrent = newPlayData[player][`antiDiag`] || 0;
          antiDiagCurrent += 1;
          newPlayData[player][`antiDiag`] = antiDiagCurrent;
          if (antiDiagCurrent === boardSize) {
            winner = player;
          }
        }
        return player;
      }
      return cell;
    })
  );

  if (newCount === boardSize * boardSize && !winner) {
    winner = 'Draw';
  }

  return {
    count: newCount,
    board: newBoard,
    winner,
    playData: newPlayData,
  };
}
