import Board from './Board';
class Player {
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }
    getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
        if(depth == 0) this.nodesMap.clear();

        if(board.isTerminal() || depth == this.maxDepth) {
            if(board.isTerminal().winner == 'x') {
                return 100 - depth;
            } else if (board.isTerminal().winner == 'o') {
                return -100 + depth;
            }
            return 0;
        }
        if(maximizing) {
            let best = -100;
    
            board.availableMoves().forEach(index => {
                let child = new Board(board.currentState.slice());
                child.insert('x', index);
                let nodeValue = this.getBestMove(child, false, callback, depth + 1);
                best = Math.max(best, nodeValue);
    
                if(depth == 0) {
                    var moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${index}` : index;
                    this.nodesMap.set(nodeValue, moves);
                    }
            });
    
            if(depth == 0) {
                if(typeof this.nodesMap.get(best) == 'string') {
                    var arr = this.nodesMap.get(best).split(',');
                    var rand = Math.floor(Math.random() * arr.length); 
                    var ret = arr[rand]; 
                } else {
                    ret = this.nodesMap.get(best); 
                }
    
                callback(ret);
                return ret; 
            
            }
            return best; 
        }
        if(!maximizing) {
            let best = 100;
            board.availableMoves().forEach(index => {
                let child = new Board(board.currentState.slice());
                child.insert('o', index);
                let nodeValue = this.getBestMove(child, true, callback, depth + 1);
                best = Math.min(best, nodeValue);
    
                if(depth == 0) {
                    var moves = this.nodesMap.has(nodeValue) ? `${this.nodesMap.get(nodeValue)},${index}` : index;
                    this.nodesMap.set(nodeValue, moves);
                    }
            });
    
        
    
            if(depth == 0) {
                if(typeof this.nodesMap.get(best) == 'string') {
                    var arr = this.nodesMap.get(best).split(',');
                    var rand = Math.floor(Math.random() * arr.length); 
                    var ret = arr[rand]; 
                } else {
                    ret = this.nodesMap.get(best); 
                }
    
                callback(ret);
                return ret; 
            
            }
            return best; 
        }
      }

};


export default Player;