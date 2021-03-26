const board = [
    null, 0, null, 1, null, 2, null, 3, 4, null, 5, null, 6, null, 7, null, null, 8, null, 9, null, 10, null, 11, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 12, null, 13, null, 14, null, 15, null, null, 16, null, 17, null, 18, null, 19, 20, null, 21, null, 22, null, 23, null
]

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

const box = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span")
const redplayersTurn = document.querySelectorAll(".redPlayersTurn");
const blackplayersTurn = document.querySelectorAll(".blackPlayersTurn");
const restartButton = document.getElementById("restartButton")
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage');
const blackPoints = document.querySelector(".blackPoints");
const redPoints = document.querySelector(".redPoints");

const refreshPage = () => {
    location.reload();
}


restartButton.addEventListener("click", refreshPage);


let playersTurn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

let piece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    sevenSpace: false,
    nineSpace: false,
    fourteenSpace: false,
    eighteenSpace: false,
    minusSevenSpace: false,
    minusNineSpace: false,
    minusFourteenSpace: false,
    minusEighteenSpace: false
}

let giveEventListner = () => {
    if (playersTurn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

let getPlayerPieces = () => {
    if (playersTurn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeBoxonclick();
    resetBorders();
}

let removeBoxonclick = () => {
    for (let i = 0; i < box.length; i++) {
        box[i].removeAttribute("onclick");
    }
}

let resetBorders = () => {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "3px solid white";
    }
    resetPieceProperties();
    grabPiece();
}

let resetPieceProperties = () => {
    piece.pieceId = -1;
    piece.pieceId = -1;
    piece.isKing = false;
    piece.sevenSpace = false;
    piece.nineSpace = false;
    piece.fourteenSpace = false;
    piece.eighteenSpace = false;
    piece.minusSevenSpace = false;
    piece.minusNineSpace = false;
    piece.minusFourteenSpace = false;
    piece.minusEighteenSpace = false;
}

let grabPiece = () => {
    piece.pieceId = parseInt(event.target.id);
    piece.indexOfBoardPiece = findPiece(piece.pieceId);
    isPieceKing();
}

let isPieceKing =() => {
    if (document.getElementById(piece.pieceId).classList.contains("king")) {
        piece.isKing = true;
    } else {
        piece.isKing = false;
    }
    movePieces();
}

let movePieces = () => {
    if (board[piece.indexOfBoardPiece + 7] === null && box[piece.indexOfBoardPiece + 7].classList.contains("empty") !== true) {
        piece.sevenSpace = true;
    }
    if (board[piece.indexOfBoardPiece + 9] === null && box[piece.indexOfBoardPiece + 9].classList.contains("empty") !== true) {
        piece.nineSpace = true;
    }
    if (board[piece.indexOfBoardPiece - 7] === null && box[piece.indexOfBoardPiece - 7].classList.contains("empty") !== true) {
        piece.minusSevenSpace = true;
    }
    if (board[piece.indexOfBoardPiece - 9] === null && box[piece.indexOfBoardPiece - 9].classList.contains("empty") !== true) {
        piece.minusNineSpace = true;
    }
    jumpSpaces();
}

let jumpSpaces =()=> {
    if (playersTurn) {
        if (board[piece.indexOfBoardPiece + 14] === null && box[piece.indexOfBoardPiece + 14].classList.contains("empty") !== true && board[piece.indexOfBoardPiece + 7] >= 12) {
            piece.fourteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece + 18] === null && box[piece.indexOfBoardPiece + 18].classList.contains("empty") !== true && board[piece.indexOfBoardPiece + 9] >= 12) {
            piece.eighteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece - 14] === null && box[piece.indexOfBoardPiece - 14].classList.contains("empty") !== true && board[piece.indexOfBoardPiece - 7] >= 12) {
            piece.fourteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece - 18] === null && box[piece.indexOfBoardPiece - 18].classList.contains("empty") !== true && board[piece.indexOfBoardPiece - 9] >= 12) {
            piece.minusEighteenSpace = true;
        }
    } else {
        if (board[piece.indexOfBoardPiece + 14] === null && box[piece.indexOfBoardPiece + 14].classList.contains("empty") !== true && board[piece.indexOfBoardPiece + 7] < 12 && board[piece.indexOfBoardPiece + 7] !== null) {
            piece.fourteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece + 18] === null && box[piece.indexOfBoardPiece + 18].classList.contains("empty") !== true && board[piece.indexOfBoardPiece + 9] < 12 && board[piece.indexOfBoardPiece + 9] !== null) {
            piece.eighteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece - 14] === null && box[piece.indexOfBoardPiece - 14].classList.contains("empty") !== true && board[piece.indexOfBoardPiece - 7] < 12 && board[piece.indexOfBoardPiece - 7] !== null) {
            piece.minusFourteenSpace = true;
        }
        if (board[piece.indexOfBoardPiece - 18] === null && box[piece.indexOfBoardPiece - 18].classList.contains("empty") !== true && board[piece.indexOfBoardPiece - 9] < 12 && board[piece.indexOfBoardPiece - 9] !== null) {
            piece.minusEighteenSpace = true;
        }
    }
    checkPieceConditions();
}

let checkPieceConditions = () => {
    if (piece.isKing) {
        givePieceBorder();
    } else {
        if (playersTurn) {
            piece.minusSevenSpace = false;
            piece.minusNineSpace = false;
            piece.minusFourteenSpace = false;
            piece.minusEighteenSpace = false;
        } else {
            piece.sevenSpace = false;
            piece.nineSpace = false;
            piece.fourteenSpace = false;
            piece.eighteenSpace = false;
        }
        givePieceBorder();
    }
}

let givePieceBorder = () => {
    if (piece.sevenSpace || piece.nineSpace || piece.fourteenSpace || piece.eighteenSpace || piece.minusSevenSpace || piece.minusNineSpace || piece.minusFourteenSpace || piece.minusEighteenSpace) {
        document.getElementById(piece.pieceId).style.border = "3px solid yellow";
        giveBoxClick();
    } else {
        return;
    }
}

let giveBoxClick = () => {
    if (piece.sevenSpace) {
        box[piece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (piece.nineSpace) {
        box[piece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (piece.fourteenSpace) {
        box[piece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (piece.eighteenSpace) {
        box[piece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (piece.minusSevenSpace) {
        box[piece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (piece.minusNineSpace) {
        box[piece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (piece.minusFourteenSpace) {
        box[piece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (piece.minusEighteenSpace) {
        box[piece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
    }
}

let makeMove = (number) => {
    document.getElementById(piece.pieceId).remove();
    box[piece.indexOfBoardPiece].innerHTML = "";
    if (playersTurn) {
        if (piece.isKing) {
            box[piece.indexOfBoardPiece + number].innerHTML = `<p class="redPiece king" id="${piece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        } else {
            box[piece.indexOfBoardPiece + number].innerHTML = `<p class="redPiece" id="${piece.pieceId}"></p>`;
            redsPieces = document.querySelectorAll("p");
        }
    } else {
        if (piece.isKing) {
            box[piece.indexOfBoardPiece + number].innerHTML = `<span class="blackPiece king" id="${piece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        } else {
            box[piece.indexOfBoardPiece + number].innerHTML = `<span class="blackPiece" id="${piece.pieceId}"></span>`;
            blacksPieces = document.querySelectorAll("span");
        }
    }

    let indexOfPiece = piece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

let changeData = (indexOfBoardPiece, modifiedIndex, removePiece) => {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(piece.pieceId);
    if (playersTurn && piece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(piece.pieceId).classList.add("king")
    }
    if (playersTurn === false && piece.pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(piece.pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (playersTurn && piece.pieceId < 12) {
            box[removePiece].innerHTML = "";
            blackScore--
        }
        if (playersTurn === false && piece.pieceId >= 12) {
            box[removePiece].innerHTML = "";
            redScore--
        }
    }
    resetPieceProperties();
    removeBoxonclick();
    removeEventListeners();
}

let removeEventListeners = () => {
    if (playersTurn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

// let playerScore = () => {
//     if (blackPoint){
//         for (let i = 0; i === 3; i++){
//             redplayersTurn.checkForWin[i]
//             redPoints.innerHTML = ``
            
//         }
//     }
// }

let checkForWin = () => {
    if (blackScore === 0) {
        for (let i = 0; i < redplayersTurn.length; i++) {
            redplayersTurn[i].style.color = "black";
            blackplayersTurn[i].style.display = "none";
            winningMessageText.innerText = "Red Wins!";
            winningMessageElement.classList.add("show")
        }
    } else if (redScore === 0) {
        for (let i = 0; i < blackplayersTurn.length; i++) {            
            blackplayersTurn[i].style.color = "black";
            redplayersTurn[i].style.display = "none";
            winningMessageText.innerText = "Black Wins!";
            winningMessageElement.classList.add("show")
        }
    }
    changePlayer();
}



let changePlayer = () => {
    if (playersTurn) {
        playersTurn = false;
        for (let i = 0; i < redplayersTurn.length; i++) {
            redplayersTurn[i].style.color = "lightGrey";
            blackplayersTurn[i].style.color = "black";
        }
    } else {
        playersTurn = true;
        for (let i = 0; i < blackplayersTurn.length; i++) {
            blackplayersTurn[i].style.color = "lightgray";
            redplayersTurn[i].style.color = "black";
        }
    }
    giveEventListner();
}

giveEventListner();