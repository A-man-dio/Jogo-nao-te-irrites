import { UI } from './UI.js';
import { base_positions, choose, home_entrance, home_positions, players, safe_positions, start_positions, state, turning_points } from './constants.js';

export class Ludo {
    constructor() {
        console.log("vamos jogar");
        this.listenDiceClick();
        this.listenPieceClick();
        this.resetGame();
    }

    currentPositions = {
        P1: [],
        P2: [],
        P3: [],
        P4: [],
    }

    _setarValorDado = true;

    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        UI.setTurn(value);
    }

    _qtdVezesRolarDadoDepoisMatanca = 0;
    get qtdVezesRolarDadoDepoisMatanca() {
        return this._qtdVezesRolarDadoDepoisMatanca;
    }
    set qtdVezesRolarDadoDepoisMatanca(value) {
        this._qtdVezesRolarDadoDepoisMatanca = value;
    }

    _possibilidadeErrada = 0;
    get possibilidadeErrada() {
        return this._possibilidadeErrada;
    }
    set possibilidadeErrada(value) {
        this._possibilidadeErrada = value;
    }

    _dadoActual;
    get dadoActual() {
        return this._dadoActual;
    }
    set dadoActual(value) {
        this._dadoActual = value;
    }

    _turnoDado;
    get turnoDado() {
        return this._turnoDado;
    }
    set turnoDado(value) {
        this._turnoDado = value;
    }


    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;

        if (value === state.dice_not_rolled) {
            UI.enableDice();
            UI.unhighlightPieces();
        } else {
            UI.disableDice();
        }
    }

    _chooseDice;
    get chooseDice() {
        return this._chooseDice;
    }
    set chooseDice(value) {
        this._chooseDice = value;
    }

    // DICES

    listenDiceClick() {
        UI.listenDiceClick(this.onDiceClick.bind(this));
    }

    _vezDados = new Array(2);
    get vezDados() {
        return this._vezDados;
    }

    set vezDados(value) {
        this._vezDados = value;
    }

    _diceOne = 0;
    get diceOne() {
        return this._diceOne;
    }
    set diceOne(value) {
        this._diceOne = value;
    }

    _diceTwo = 0;
    get diceTwo() {
        return this._diceTwo;
    }
    set diceTwo(value) {
        this._diceTwo = value;
    }

    _resultado = 0; //variaveis onde ficam armazenados os valores dos dados
    get resultado() {
        return this._resultado;
    }
    set resultado(value) {
        this._resultado = value;
    }

    onDiceClick() {
        console.log('dice clicked!', this);
        this.chooseDice = choose.not_chose_dice;
        var dice1 = document.getElementById('dice1');
        var dice2 = document.getElementById('dice2');

        this.diceOne = Math.floor((Math.random() * 6) + 1);
        this.diceTwo = Math.floor((Math.random() * 6) + 1);

        
        /*if(this._setarValorDado){
            this.diceOne = 1;
            this.diceTwo = 1;
            this._setarValorDado = false;
        }*/

        this.resultado = this.diceOne + this.diceTwo;
        console.log(this._diceOne + ' ' + this._diceTwo);
        for (var i = 1; i <= 6; i++) {
            dice1.classList.remove('show-' + i);
            if (this.diceOne === i) {
                dice1.classList.add('show-' + i);
            }
        }

        for (var k = 1; k <= 6; k++) {
            dice2.classList.remove('show-' + k);
            if (this.diceTwo === k) {
                dice2.classList.add('show-' + k);
            }
        }

        //verificar se os dados 1 ou 2 não possuem 6 e se todas peças tão na base então pular turno
        this.state = state.dice_rolled;
        const player = players[this.turn];

        const verificarTodasPecasNaPosicaoBase = [0 , 1 ,2 , 3].filter(piece => {
            var position = this.currentPositions[player][piece];

            if ((base_positions[player].includes(position))) {
                return true;
            }
        });

        if ( (verificarTodasPecasNaPosicaoBase.length === 4) && (this.diceOne !== 6) && (this.diceTwo !== 6) ){
            this.incrementTurn();
            return;
        }
        //


        //
        var escolhaDado = document.getElementsByClassName("escolher-dado")[0];
        var containerDice = document.getElementsByClassName("container-dice");

        containerDice[0].classList.add("hover-effect");
        containerDice[1].classList.add("hover-effect");
        escolhaDado.classList.remove("ocultar");
        containerDice[0].addEventListener('click', this.handleClickContainer1.bind(this));
        containerDice[1].addEventListener('click', this.handleClickContainer2.bind(this));
        //
    }
    //

    handleClickContainer1() {

        if (this.chooseDice === choose.chose_dice) {
            return;
        }

        var escolhaDado = document.getElementsByClassName("escolher-dado")[0];
        var containerDice = document.getElementsByClassName("container-dice");
        this.vezDados = [1, 2];
        containerDice[0].classList.remove("hover-effect");
        containerDice[1].classList.remove("hover-effect");
        escolhaDado.classList.add("ocultar");
        this.chooseDice = choose.chose_dice;
        console.log(this.vezDados);
        this.checkForEligiblePieces1();
    }

    handleClickContainer2() {
        if (this.chooseDice === choose.chose_dice) {
            return;
        }

        var escolhaDado = document.getElementsByClassName("escolher-dado")[0];
        var containerDice = document.getElementsByClassName("container-dice");
        this.vezDados = [2, 1];
        containerDice[0].classList.remove("hover-effect");
        containerDice[1].classList.remove("hover-effect");
        escolhaDado.classList.add("ocultar");
        this.chooseDice = choose.chose_dice;
        console.log(this.vezDados);
        this.checkForEligiblePieces1();
    }


    checkForEligiblePieces1() {
        this.turnoDado = 1;
        this.dadoActual = (this.vezDados[0] == 1) ? this.diceOne : this.diceTwo;
        const player = players[this.turn];
        // eligible pieces of given player
        const eligiblePieces = this.getEligiblePieces(player);
        if (eligiblePieces.length) {
            // highlight the pieces
            UI.highlightPieces(player, eligiblePieces);
        } else {
            //this.checkForEligiblePieces2();

            if(this.possibilidadeErrada === 1){
                this.checkForEligiblePieces2();
                this.possibilidadeErrada = 0;
                return;
            }

            var aux;
            aux = this.vezDados[0];
            this.vezDados[0] = this.vezDados[1];
            this.vezDados[1] = aux;
            this.possibilidadeErrada++;
            this.checkForEligiblePieces1();
        }
    }

    checkForEligiblePieces2() {
        this.turnoDado = 2;
        this.dadoActual = (this.vezDados[1] == 1) ? this.diceOne : this.diceTwo;
        const player = players[this.turn];
        // eligible pieces of given player
        const eligiblePieces = this.getEligiblePieces(player);
        if (eligiblePieces.length) {
            // highlight the pieces
            UI.highlightPieces(player, eligiblePieces);
        } else {
            this.incrementTurn();
        }
    }

    getEligiblePieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if (currentPosition === home_positions[player]) {
                return false;
            }

            if ((base_positions[player].includes(currentPosition)) && (this.dadoActual < 6)) {
                return false;
            }

            if ((home_entrance[player].includes(currentPosition)) && (this.resultado > home_positions[player] - currentPosition)) {
                return false;
            }

            return true;
        });
    }

    resetGame() {
        this.currentPositions = structuredClone(base_positions);

        players.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece])
            })
        });

        this.turn = 0;
        this.state = state.dice_not_rolled;
    }

    listenPieceClick() {
        UI.listenPieceClick(this.onPieceClick.bind(this));
    }

    onPieceClick(event) {
        const target = event.target;

        if (((!target.classList.contains('player-piece')) || (!target.classList.contains('highlight')))) {
            return;
        }
        console.log('piece clicked');

        const player = target.getAttribute('player-id');
        const piece = target.getAttribute('piece');
        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        console.log(player, piece);

        if (this.state === state.dice_not_rolled) { //não se pode clicar em nenhuma peça sem que os dados sejam rolados
            return;
        }

        const currentPosition = this.currentPositions[player][piece];

        if ((base_positions[player].includes(currentPosition)) && (this.dadoActual === 6)) {
            console.log("veio aqui");
            this.setPiecePosition(player, piece, start_positions[player]);

            if (this.turnoDado === 2) {
                this.state = state.dice_not_rolled; //rodar denovo
            } else {
                UI.unhighlightPieces();
                this.checkForEligiblePieces2();
            }
            return;
        }


        UI.unhighlightPieces();
        this.movePiece(player, piece, this.dadoActual);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        UI.setPiecePosition(player, piece, newPosition);
    }

    movePiece(player, piece, moveBy) {
        if (moveBy === 0) {
            return;
        }
        /*this.setPiecePosition(player, piece, this.currentPositions[player][piece] + moveBy);*/
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                // check if player won
                if (this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if ((isKill)) {
                    this.qtdVezesRolarDadoDepoisMatanca++;
                }

                if ( ((this.diceOne === 6) || (this.diceTwo === 6)) && (this.turnoDado === 2 ) ){
                    console.log("porque");
                    this.state = state.dice_not_rolled;
                    return;
                }

                if (this.turnoDado === 1) {
                    console.log("uii");
                    this.checkForEligiblePieces2();
                } else {
                    console.log("333");

                    if (this.qtdVezesRolarDadoDepoisMatanca){
                        this.state = state.dice_not_rolled;
                        this.qtdVezesRolarDadoDepoisMatanca--;
                        return;
                    }
                    this.incrementTurn();
                }
            }
        }, 200);
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }

    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (currentPosition === turning_points[player]) {
            return home_entrance[player][0];
        }
        else if (currentPosition === 80) {
            return 1;
        }
        return currentPosition + 1;
    }

    incrementTurn() {
        this.turn = (this.turn === 3) ? 0 : this.turn + 1;
        this.state = state.dice_not_rolled;
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === home_positions[player]);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        var opponents;

        if (player === "P1") {
            opponents = ["P2", "P3", "P4"];
        } else if (player === "P2") {
            opponents = ["P1", "P3", "P4"];
        } else if (player === "P3") {
            opponents = ["P1", "P2", "P4"];
        } else {
            opponents = ["P1", "P2", "P3"];
        }

        let kill = false;

        [0, 1, 2, 3].forEach(piece => {

            opponents.forEach(opponent => {
                const opponentPosition = this.currentPositions[opponent][piece];

                if ((currentPosition === opponentPosition) && (!safe_positions.includes(currentPosition))) {
                    this.setPiecePosition(opponent, piece, base_positions[opponent][piece]);
                    kill = true
                }
            });

        });

        return kill
    }







}

const ludoGame = new Ludo();