var gameState = 'over';
var textIDElement = document.getElementById('text');
var computerMoves = [];
var humanMoves = [];
var humanPlayer = '';
var computerPlayer = '';
var turn = 'computer'
var timeOutID;
var movesLeft = 9;
var gameBoard = ['e','e','e','e','e','e','e','e','e'];
var winMoves = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
var winningMoves = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

checkGameState(gameState);

//************************************************************************
//<-------------start of game buttons enablers and disablers------------->
//************************************************************************


function checkGameState (gameState) {
  // check if game state is over
  // call disable XoButtons() and disableGameBoard()
  if (gameState === 'over') {
    textIDElement.innerHTML = "Press start to play a new game"
    disableXoButtons();
    disableGameboard();  
  } 
};

function disableXoButtons() {
  //disables the x and o button
  xoButtons = document.getElementsByClassName("symbol");
    for (var i = 0; i < xoButtons.length; i++) {
      xoButtons[i].disabled = true;
    }
}

function enableXoButtons() {
  //enable the x and o button
  xoButtons = document.getElementsByClassName("symbol");
    for (var i = 0; i < xoButtons.length; i++) {
      xoButtons[i].disabled = false;
    }
}

function disableStartButton() {
  //disable the start button
  startButton = document.getElementById('start');
  startButton.disabled = true;
}

function enableStartButton() {
  //enable the start button
  startButton = document.getElementById('start');
  startButton.disabled = false;
}

function enableGameboard() {
  //enable the game board buttons
  var board = document.getElementsByClassName("grid");
  for (var i = 0; i < board.length; i++) {
    board[i].disabled = false;
  }
}

function disableGameboard(){
  //disable the game board buttons
  var board = document.getElementsByClassName("grid");
  for (var i = 0; i < board.length; i++) {
    board[i].disabled = true;
  }
}

//**********************************************************************
//<-------------end of game buttons enablers and disablers------------->
//**********************************************************************


//***************************************************
//<-------------Start of game functions------------->
//***************************************************


function main(clickedID) {
  // main function
  // updates the turn variable
  // call the updateGameboard()
  // and decrease the moveLeft counter by 1
  // also call for the checkWinner function if movesLeft are < 7
  elementClicked = document.getElementById(clickedID);
  if (turn == 'computer') {
    elementClicked.innerHTML = computerPlayer;
    turn = 'humanPlayer';
    updateGameboard(gameBoard);
    movesLeft--;
    checkWinner(gameBoard, movesLeft);
  } else if (turn == 'humanPlayer') {
    enableGameboard();
    if (legalMove(gameBoard, clickedID)) {
      elementClicked.innerHTML = humanPlayer;
      turn = 'computer';
      disableGameboard();
      updateGameboard(gameBoard);
      movesLeft--;
      humanMoves.push(parseInt(elementClicked.id))
      checkWinner(gameBoard, movesLeft);
      computerMove(findMove(gameBoard, elementClicked));
    };
  };
};

function gameOver() {
  // game over function 
  // change gameState to over
  // change turn back to computer
  // call enableStart() and disableGameboard()
  // also call startGame() on a 1.5 sec delay
  gameState = 'over';
  turn = 'computer';
  computerMoves = [];
  humanMoves = []
  winningMoves = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];
  disableGameboard()
  timeoutID = window.setTimeout(startGame, 2000)
}

function checkWinner(gameBoard, movesLeft) {
  // check for winners by looking for game winning strings 'OOO' or 'XXX'
  var winnerObj = {};
  var text = document.getElementById('text');
  var winner = false;
  var humanWin = '';
  var computerWin = '';
  
  // assign the correct win strings to each respective player, 'OOO' or 'XXX'
  for (var i = 0; i < 3; i++) {
    humanWin = humanWin + humanPlayer
    computerWin = computerWin + computerPlayer
  }
  
  // loop through all 8 win positions, and assign them to a key and prop value
  // ie '0,1,2': 'OXO' means top row has O, X and O
  // ie '0,3,6': 'OOO' means left column has O, O, and O
  // ie '0,4,8': 'OeX' means diagonal starting from 0, to 8 has O, empty box, and X
  // help check for winners
  for (var i in winMoves) {
    var index0 = winMoves[i][0];
    var index1 = winMoves[i][1];
    var index2 = winMoves[i][2];
    winnerObj[winMoves[i].toString()] = gameBoard[index0]+gameBoard[index1]+gameBoard[index2];
  }
  
  // check in winnerObj to see any 'OOO' or 'XXX' strings
  // ends game if so
  for (var i in winnerObj) {
    if (winnerObj[i] === humanWin) {
      winner = true;
      text.innerHTML = 'Congrats! You win.';
      gameOver();
      break;
    } else if (winnerObj[i] === computerWin) {
      winner = true;
      text.innerHTML = 'Awww. You lose!';
      gameOver();
      break;
    } 
  }
  //check for draw
  if (movesLeft == 0 && !winner) {
      text.innerHTML = 'Game over. It\'s a draw';
      gameOver()
  }
}

function updateGameboard(gameboard) {
  //update the gameBoard variable
  guiBoard = document.getElementsByClassName('grid')
  for (var i = 0; i < gameboard.length; i++) {
    text = guiBoard[i].innerHTML
    if (text === 'O' || text === 'X' ) {
      gameBoard[i] = text
    }
  }
}

function legalMove(gameBoard, clicked) {
  // check if clicked is empty
  if (gameBoard[clicked] === 'e') {
    return true;
  } else {
    return false;
  };
};

function clearBoard() {
  // set gameBoard variable back to all e;
  // set movesLeft variable back to 9
  // set all gameboard text back to empty
  gameBoard = ['e','e','e','e','e','e','e','e','e'];
  movesLeft = 9;
  grid = document.getElementsByClassName('grid');
  for (var i = 0; i < grid.length; i++) {
    grid[i].innerHTML = ''
  }
}

function startGame() {
  // change game state to running
  // call enableXoButtons() and disableStartButton()
  gameState = 'running';
  textIDElement.innerHTML = 'X or O?'
  enableXoButtons();
  disableStartButton();
}

function assignSymbols(clickedID) {
  // take what was selected for the human player and assign the x's and o'x to the respective player
  // also call disableXoButtons(), clearBoard() and computerMove()
  humanPlayer = clickedID;
  if (humanPlayer === 'O') {
    computerPlayer = 'X';
  } else {
    computerPlayer = 'O';
  }
  element = document.getElementById('text');
  disableXoButtons();
  element.innerHTML = 'You\'ve selected ' + humanPlayer;
  clearBoard()
  computerMove(gameBoard)
}

//*************************************************
//<-------------end of game functions------------->
//*************************************************




//***********************************************************
//<-------------start of computer ai functions ------------->
//***********************************************************

function computerMove(boxNumber) {
  //computer select the box
  enableGameboard();
  
  if (movesLeft == 9) {
  // at start, comp select the center box
    document.getElementById('4').click();
    computerMoves.push(4);
  } else {
  // boxnumber will be provided by the find move function
    document.getElementById('' + boxNumber).click()
    computerMoves.push(boxNumber)
  }
}

function findMove(gameBoard, humanMove) {
  var bestMove = '';
  var movesObject = {'win': [], 'draw': []}
  var possibleMoves = []
  var adjacentMoves = {
    '0': [1,3], '1': [0,2], '2': [1,5],
    '3': [0,6], '5': [2,8], '6': [3,7],
    '7': [6,8], '8': [5,7]
  };
  // get possible moves available
  for (var i in gameBoard) {
    if (gameBoard[i] === 'e'){
      possibleMoves.push(i)
    }
  }
  var counterMoves = adjacentMoves[humanMove.id];
  //score the moves adjacent to human move and own's move
  // scan to see if you can win, if not, get the best available adjacent move
  // if moves >= 7, sugggest adjacent move
  
  //pick the first option in counterMoves if its the computer second move
  if (movesLeft >= 7) {
    bestMove = counterMoves[0];
  } else {
    if (movesLeft > 1) {
      var win = false
      var winningMove = '';
      //find the winning move by passing each move to canWin()
      for (var i in possibleMoves) {
        if (canWin(gameBoard, possibleMoves[i])) {
          win = true;
          winningMove = parseInt(possibleMoves[i])
          break;
        }
      }
      // if winning is possible, best move is the winning move
      if (win) {
        bestMove = winningMove;
      } else {
        // splice the winning scenario array that the human player blocked
        for (var i = winningMoves.length-1; i >= 0; i--) {
          for (var j = humanMoves.length-1; j >= 0; j--)  {
            if (winningMoves[i].includes(humanMoves[j]))   {
              winningMoves.splice(i, 1)
              break;
            }
          }
        }
        // look for adjacent moves that can lead to winning move
        for (var x in winningMoves) {
          for (var y in counterMoves) {
            if (winningMoves[x].includes(counterMoves[y])) {
              bestMove = counterMoves[y];
              break;
            }
          }
        }
      }
    } else {
      bestMove = possibleMoves[0];
    }
  }
  return bestMove;
}

function canWin(symbol, move) {
  // return true if winning is possible
  var board = {}
  var winObj = {}
  var canWin = false;
  var winString = ''
  
  // assign winning string for Computer
  for (var i = 0; i < 3; i++) {
    winString = winString + computerPlayer;
  }
  
  // assign board object to current gameboard state
  for (var i in gameBoard) {
    board['' + i] = gameBoard[i];
  }
  board[move] = computerPlayer;
  
  // loop and assign x's and o's to the 8 possible win scenario
  for (var i in winningMoves) {
    var index0 = winningMoves[i][0];
    var index1 = winningMoves[i][1];
    var index2 = winningMoves[i][2];
    winObj[winningMoves[i].toString()] = board[''+index0] + board[''+index1] + board[''+index2] 
  }
  // check if each of the 8 possible win scenario has 3 of the same string for computer
  for (var i in winObj) {
    if (winObj[i] === winString) {
      canWin = true;
    }
  }
  return canWin;
}

//***************************************************************
//<-------------end AI and computer move functions ------------->
//***************************************************************