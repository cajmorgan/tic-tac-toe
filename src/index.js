import Board from './classes/Board';
let board = new Board(['x','x','x','o','x','x','x','x','x'])

board.printConsoleBoard();
console.log(board.isEmpty());
console.log(board.isFull());
console.log('hallå')
board.isTerminal();