import { coordenadas, players, step_lenght } from './constants.js';
var rollButton = document.getElementById('roll').getElementsByTagName("button")[0];
const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'), //red
    P2: document.querySelectorAll('[player-id="P2"].player-piece'), //green
    P3: document.querySelectorAll('[player-id="P3"].player-piece'), //blue
    P4: document.querySelectorAll('[player-id="P4"].player-piece'), //yellow
}


export class UI {
    static listenDiceClick(callback) {
        rollButton.addEventListener('click', callback);
    }

    static listenPieceClick(callback) {
        document.querySelector('.player-pieces').addEventListener('click', callback)
    }


    /**
    * 
    * @param {string} player 
    * @param {Number} piece 
    * @param {Number} newPosition 
    */
    static setPiecePosition(player, piece, newPosition) { //setar a posição de uma peça qualquer , para uma posição
        console.log("entra");
        if (!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not found`)
            return;
        }

        const [x, y] = coordenadas[newPosition];

        const pieceElement = playerPiecesElements[player][piece];
        pieceElement.style.top = y + 'px';
        pieceElement.style.left = x + 'px';
    }

    static setTurn(index) {
        if (index < 0 || index >= players.length) { //apenas existem 4 jogadores
            console.error('index out of bound!');
            return;
        }

        const player = players[index]; //pega o jogador , o numero nesse caso , p1 , p2 , p3 ou p4

        // Display player ID
        document.querySelector('.active-player span').innerText = player;

        const activePlayerBase = document.querySelector('.player-base.highlight'); //remover o highligh do jogador anterior
        if (activePlayerBase) {
            activePlayerBase.classList.remove('highlight');
        }
        // highlight
        document.querySelector(`[id="${player}"].player-base`).classList.add('highlight');
    }

    static enableDice() {
        rollButton.removeAttribute('disabled');
    }

    static disableDice() {
        rollButton.setAttribute('disabled', '');
    }


    /**
     * 
     * @param {string} player 
     * @param {Number[]} pieces 
     */
    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            pieceElement.classList.add('highlight');
        })
    }

    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(ele => {
            ele.classList.remove('highlight');
        })
    }

    


}

/*UI.setPiecePosition("P1", 0, 1);
UI.setTurn(0);
UI.setTurn(1);
UI.disableDice();
UI.enableDice();
UI.highlightPieces("P1" , [0]);
UI.unhighlightPieces();*/



