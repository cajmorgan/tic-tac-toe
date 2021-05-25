import Board from './classes/Board';
import Player from './classes/Player';


//Global DOM
const startBtn = document.querySelector('.start');
const grid = document.querySelector('.grid');
let scoreO = 0;
let scoreX = 0;

function onLoadAni() {
    let i = 100;
    let looper = setInterval(() => {
        i--;
        document.querySelector('.X').textContent = '' + i;
        document.querySelector('.O').textContent = '' + i;
        if(i == 0) {
            clearInterval(looper);
        }
    })
    
}
onLoadAni();

function playGame(depth = -1, startingPlayer = 1) {
    startBtn.disabled = true;
    let p = new Player(parseInt(depth));
    let board = new Board(['','','','','','','','',''])
    if(document.querySelector('.cell')) {
        const allCells = document.querySelectorAll('.cell') 
        for(let i = 0; i <= allCells.length; i++) {
            if(allCells[i]) {
                allCells[i].textContent = '';
                allCells[i].style.backgroundColor = "transparent";
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
                document.querySelector('.X').textContent = scoreX
                console.log(scoreX);
                //Run color explosion

            }
            let cellId = e.target.id; 
            board.currentState[cellId.slice(-1)] = 'x';
            e.target.textContent = 'x';
            e.target.style.backgroundColor = "rgb(90, 186, 218)";
            board.printConsoleBoard();
            console.log(board.isTerminal()['winner']);
            if (board.isTerminal().winner == 'draw') {
                startBtn.textContent = "Play Again";
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
            divSelection.style.backgroundColor = "red";
            board.printConsoleBoard();
            console.log(board.isTerminal().winner);
            if(board.isTerminal().winner == 'o') {
                scoreO += 1;
                document.querySelector('.O').textContent = scoreO
                console.log(scoreO);
                startBtn.textContent = "Play Again";
                startBtn.disabled = false;
                //Blinking colors 
                const allCellss = document.querySelectorAll('.cell')
                const winCombos = [allCellss[0].textContent + allCellss[1].textContent + allCellss[2].textContent, 
                                    allCellss[3].textContent + allCellss[4].textContent + allCellss[5].textContent,
                                    allCellss[6].textContent + allCellss[7].textContent + allCellss[8].textContent,
                                    allCellss[0].textContent  + allCellss[3].textContent + allCellss[6].textContent,
                                    allCellss[1].textContent + allCellss[4].textContent + allCellss[7].textContent,
                                    allCellss[2].textContent + allCellss[5].textContent + allCellss[8].textContent ,
                                    allCellss[0].textContent + allCellss[4].textContent + allCellss[8].textContent,
                                    allCellss[2].textContent + allCellss[4].textContent + allCellss[6].textContent];
                const winCombosBreak = [allCellss[0], allCellss[1], allCellss[2], 
                                        allCellss[3], allCellss[4], allCellss[5],
                                        allCellss[6], allCellss[7], allCellss[8],
                                        allCellss[0], allCellss[3], allCellss[6],
                                        allCellss[1], allCellss[4], allCellss[7],
                                        allCellss[2], allCellss[5], allCellss[8],
                                        allCellss[0], allCellss[4], allCellss[8],
                                        allCellss[2], allCellss[4], allCellss[6]];
                                    // let filtered = winCombos.forEach(function(item, index) {
                                    //     if(item === 'ooo') {
                                    //         let numIt = index
                                    //         return numIt;
                                    //     }
                                    // });
                                    let findIt = (item) => item === 'ooo';  
                                    let filtered = winCombos.findIndex(findIt);
                                        let color = 'orange';
                                        function colorAlgorithm() {
                                                filtered = (filtered + 1) * 3;
                                                let i = 0;
                                            let colorLoop = setInterval(() => {
                                                i += 1;
                                                winCombosBreak[filtered - 1].style.backgroundColor = color;
                                                winCombosBreak[filtered - 2].style.backgroundColor = color;
                                                winCombosBreak[filtered - 3].style.backgroundColor = color;
                                                if(i % 2 == 0) {
                                                    color = 'orange';
                                                } else {
                                                    color = 'limegreen';
                                                }
                                                startBtn.addEventListener('click', () => {
                                                    clearInterval(colorLoop);
                                                })
                                            }, 300) 
                                            
                                            
                                        }
                                        colorAlgorithm();
                                    console.log(filtered);
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
