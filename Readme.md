# Tic Tac Toe Game (React)

[![Travis Build](https://travis-ci.org/sabbiu/tic-tac-toe.svg?branch=master)](https://travis-ci.org/github/sabbiu/tic-tac-toe)

clone this repo and cd into it. Execute the following commands from the root directory of this project.

Demo can be found at: [tictactoe](http://tictactoe.sabbiu.me.s3-website.ap-south-1.amazonaws.com/index.html)

Coverage Report: [tictactoe-coverage](http://tictactoe.sabbiu.me.s3-website.ap-south-1.amazonaws.com/coverage/index.html)

## Install Dependencies

```
npm install
```

## Start Development Server

```
npm start
```

Project will be available at http://localhost:8080/

## Test Project

```
npm test
```

Running above command will test all the files.

- To watch the changes made during test, execute `npm run test:watch`
- To generate the coverage report: execute `npm run test:coverage`. Coverage report will be generated in `coverage` directory. To see the report, execute `npx serve coverage/lcov-report`

## Build Project

```
npm run build
```

Build files will be generated in `dist` directory. Run `npx serve dist` to serve build files locally.

## Appendix

### Coverage

| File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  |
| ------------------ | ------- | -------- | ------- | ------- | ------------------ |
| All files          | 92.5    | 83.67    | 82.35   | 93.51   |
| src                | 81.25   | 60       | 75      | 83.87   |
| App.js             | 100     | 100      | 100     | 100     |
| Board.js           | 77.78   | 60       | 66.67   | 80.77   | 96,104,111-112,122 |
| Game.js            | 100     | 100      | 100     | 100     |
| Square.js          | 100     | 100      | 100     | 100     |
| src/utils          | 100     | 100      | 100     | 100     |
| constants.js       | 100     | 100      | 100     | 100     |
| getInitialBoard.js | 100     | 100      | 100     | 100     |
| togglePlayer.js    | 100     | 100      | 100     | 100     |
| updatePlay.js      | 100     | 100      | 100     | 100     |
