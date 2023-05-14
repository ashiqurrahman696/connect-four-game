let winner = document.querySelector('.winner');
let board;
let playerTurn = document.querySelector('.turn');
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;
let row = 6;
let col = 7;
let gameOver = false;
let currColumns;
let counter = 0;

setGame();

function setGame(){
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for(let r = 0; r < row; r++){
        let row = [];
        for(let c = 0; c < col; c++){
            row.push(' ');
            let tile = document.createElement('div');
            tile.id = `${r.toString()}-${c.toString()}`;
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.querySelector('.board').appendChild(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if(gameOver) return;
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns[c];
    if(r < 0) return;
    counter++;

    board[r][c] = currentPlayer;
    let tile = document.getElementById(`${r}-${c}`);
    if(currentPlayer == playerRed){
        tile.classList.add('red-piece');
        currentPlayer = playerYellow;
        playerTurn.innerText = "Yellow's turn";
    }
    else{
        tile.classList.add('yellow-piece');
        currentPlayer = playerRed;
        playerTurn.innerText = "Red's turn";
    }
    r--;
    if(counter == 42){
        winner.innerText = "Draw";
    }
    currColumns[c] = r;
    checkWinner();
}

function checkWinner(){
    for(let r = 0; r < row; r++){
        for(let c = 0; c < col - 3; c++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r][c + 1] &&
                    board[r][c + 1] == board[r][c + 2] &&
                    board[r][c + 2] == board[r][c + 3]){
                        setWinner(r, c);
                        document.getElementById(`${r}-${c}`).classList.add('highlight');
                        document.getElementById(`${r}-${c + 1}`).classList.add('highlight');
                        document.getElementById(`${r}-${c + 2}`).classList.add('highlight');
                        document.getElementById(`${r}-${c + 3}`).classList.add('highlight');
                        return;
                    }
            }
        }
    }
    for(let c = 0; c < col; c++){
        for(let r = 0; r < row - 3; r++){
            if(board[r][c] != ' '){
                if (board[r + 1][c] == board[r][c] &&
                    board[r + 1][c] == board[r + 2][c] &&
                    board[r + 2][c] == board[r + 3][c]){
                        setWinner(r, c);
                        document.getElementById(`${r}-${c}`).classList.add('highlight');
                        document.getElementById(`${r + 1}-${c}`).classList.add('highlight');
                        document.getElementById(`${r + 2}-${c}`).classList.add('highlight');
                        document.getElementById(`${r + 3}-${c}`).classList.add('highlight');
                        return;
                    }
            }
        }
    }
    for(let r = 0; r < row - 3; r++){
        for(let c = 0; c < col - 3; c++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r + 1][c + 1] &&
                    board[r + 1][c + 1] == board[r + 2][c + 2] &&
                    board[r + 2][c + 2] == board[r + 3][c + 3]){
                        setWinner(r, c);
                        document.getElementById(`${r}-${c}`).classList.add('highlight');
                        document.getElementById(`${r + 1}-${c + 1}`).classList.add('highlight');
                        document.getElementById(`${r + 2}-${c + 2}`).classList.add('highlight');
                        document.getElementById(`${r + 3}-${c + 3}`).classList.add('highlight');
                        return;
                    }
            }
        }
    }
    for(let r = 3; r < row; r++){
        for(let c = 0; c < col - 3; c++){
            if(board[r][c] != ' '){
                if (board[r][c] == board[r - 1][c + 1] &&
                    board[r - 1][c + 1] == board[r - 2][c + 2] &&
                    board[r - 2][c + 2] == board[r - 3][c + 3]){
                        setWinner(r, c);
                        document.getElementById(`${r}-${c}`).classList.add('highlight');
                        document.getElementById(`${r - 1}-${c + 1}`).classList.add('highlight');
                        document.getElementById(`${r - 2}-${c + 2}`).classList.add('highlight');
                        document.getElementById(`${r - 3}-${c + 3}`).classList.add('highlight');
                        return;
                    }
            }
        }
    }
}

function setWinner(r, c){
    if(board[r][c] == playerRed){
        winner.innerText = "Red wins";
    }
    else if(board[r][c] == playerYellow){
        winner.innerText = "Yellow wins";
    }
    gameOver = true;
}