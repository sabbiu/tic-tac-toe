/**
 * Returns a board that is squared matrix with dimension size * size
 * and value '' (empty string)
 * @param {number} size number
 */
export default function getInitialBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const inner = [];
    for (let j = 0; j < size; j++) {
      inner.push('');
    }
    board.push(inner);
  }
  return board;
}
