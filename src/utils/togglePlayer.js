import { PLAYERO, PLAYERX } from './constants';

/**
 * Toggles the player
 * @param {string} current either 'X' or 'O'
 */
export function togglePlayer(current) {
  return current === PLAYERO ? PLAYERX : PLAYERO;
}
