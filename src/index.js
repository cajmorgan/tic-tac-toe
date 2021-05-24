import Board from './classes/Board';
import Player from './classes/Player';


//Global DOM
const startBtn = document.querySelector('.start');
const grid = document.querySelector('.grid');
let scoreO = 0;
let scoreX = 0;

function playGame(depth = -1, startingPlayer = 1) {
    startBtn.disabled = true;
    let p = new Player(parseInt(depth));
    let board = new Board(['','','','','','','','',''])
    if(document.querySelector('.cell')) {
        const allCells = document.querySelectorAll('.cell') 
        for(let i = 0; i <= allCells.length; i++) {
            if(allCells[i]) {
                allCells[i].textContent = '';
            } else if (!allCells[i]) {
                continue;
            }
        }
    }
    //Create Grid
    function createGrid() {
        if(!document.querySelector('.cell')) {        
            for(let i = 0; i <= 8; i++) {
                let createDiv = document.createElement('div');
                createDiv.classList.add('cell');
                createDiv.setAttribute('id', `cell${i}`)
                grid.appendChild(createDiv);
            
            }
        } else {
            return;
        } 
        console.log('New Round')
    };
    createGrid() 
    board.printConsoleBoard();
    
    function playerTurn(e) {
        if(!e.target.textContent) {
            if(board.isTerminal() != false) {
                // startBtn.textContent = "Play Again";
                // startBtn.disabled = false;
                return;
            } 
            if(board.isTerminal().winner == 'x') {
                scoreX += 1;
                console.log(scoreX);
            }
            let cellId = e.target.id; 
            board.currentState[cellId.slice(-1)] = 'x';
            e.target.textContent = 'x';
            board.printConsoleBoard();
            console.log(board.isTerminal()['winner']);
            if (board.isTerminal().winner == 'draw') {
                startBtn.disabled = false; 
                return;
            }
            if(board.isFull() == false) {
                computerTurn();
            }
        }  
        

        function computerTurn() {
            // console.log(p.getBestMove(board, false));
            const computerSelection = p.getBestMove(board, false);
            board.currentState[computerSelection] = 'o';
            const divSelection = document.querySelector(`#cell${computerSelection}`);
            divSelection.textContent = 'o';
            board.printConsoleBoard();
            console.log(board.isTerminal().winner);
            if(board.isTerminal().winner == 'o') {
                scoreO += 1;
                console.log(scoreO);
                startBtn.textContent = "Play Again";
                startBtn.disabled = false;
                return;
            }
            if(board.isTerminal() != false) {
                startBtn.textContent = "Play Again";
                startBtn.disabled = false;
                return; 
            } 
            
        }
       


    }
    
    grid.addEventListener('click', playerTurn)
   

}
startBtn.addEventListener('click', playGame);








// console.log(p.getBestMove(board, false));
// console.log(p.nodesMap);
