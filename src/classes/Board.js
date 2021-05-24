class Board {
    constructor(currentState = ['','','','','','','','','']) {
        this.currentState = currentState;
    }
   
    printConsoleBoard() {
        let formattedString = '';
        this.currentState.forEach((cell, index) => {
            formattedString += cell ? ` ${cell} |` : '   |';
            if ((index + 1) % 3 == 0) {
                formattedString = formattedString.slice(0,-1);
                if (index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
            }
        });
        console.log('%c' + formattedString, 'color: #6d4e42;font-size:16px'); 
    
    //Check states

    }
    
    
    isEmpty() {
        return this.currentState.every(cell => !cell);
    }
    isFull() {
        return this.currentState.every(cell => cell);
    }
    isTerminal() {
        const winCombos = ['xxx', 'ooo']
        const winMoves = [this.currentState[0] + this.currentState[1] + this.currentState[2], 
                    this.currentState[3] + this.currentState[4] + this.currentState[5],
                    this.currentState[6] + this.currentState[7] + this.currentState[8],
                    this.currentState[0] + this.currentState[3] + this.currentState[6],
                    this.currentState[1] + this.currentState[4] + this.currentState[7],
                    this.currentState[2] + this.currentState[5] + this.currentState[8],
                    this.currentState[0] + this.currentState[4] + this.currentState[8],
                    this.currentState[2] + this.currentState[4] + this.currentState[6]];
        
        if(this.isEmpty()) {
            return false; 
        }
        //Check Winner
        for(let i = 0; i < winMoves.length; i++) {
            for(let j = 0; j < winCombos.length; j++) {
                if(winMoves[i] === winCombos[j]) {
                    return {'winner': winCombos[j][0]};
                } else {
                    continue;
                }
            }
        }
        //Check Draw
        if (this.isFull()) {
                return {'winner': 'draw'};
        }   else {
                return false;
            } 
        
        
    };

    insert(player, position) {
        if(position > 8 || this.currentState[position]) {
            return false; 
        } else {
            this.currentState[position] = player;
            return true; 
        }

    }
    availableMoves() {
        const moves = [];
        this.currentState.forEach((cell, index) => {
            if(!cell) {
                moves.push(index);
            }
        })
        return moves; 
    }

}

export default Board;