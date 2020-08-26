import { togglePlayer } from './togglePlayer';
import { PLAYERX, PLAYERO } from './constants';

describe('Toggle Player Helper Function', () => {
  it('toggles player from "X" to "O"', () => {
    expect(togglePlayer(PLAYERX)).toEqual(PLAYERO);
  });

  it('toggles player from "O" to "X"', () => {
    expect(togglePlayer(PLAYERO)).toEqual(PLAYERX);
  });
});
