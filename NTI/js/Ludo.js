import { UI } from './UI.js';
import { base_positions, choose, home_entrance, home_positions, players, safe_positions, start_positions, state, turning_points } from './constants.js';

export class Ludo {
    constructor() {
        console.log("vamos jogar");
        this.listenDiceClick();
        this.listenPieceClick();
        this.resetGame();
        this.setPiecePosition("P1" , 1 , 80);
        this.setPiecePosition("P1" , 0 , 1);
        this.setPiecePosition("P2" , 0 , 1);





    }

    currentPositions = {
        P1: [],
        P2: [],
        P3: [],
        P4: [],
    }

    _rolarDado1OuDado2OutraVez = 0; //vai receber 1 se for para rodar denovo o dado 1 e 2 se for para rodar denovo o dado 2

    _setarValorDado = true; //obrigar a que saia um numero no dado , só para teste

    _entrou = false;

    _turn;    //turno do jogador
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        UI.setTurn(value);  //setar o turno do jogador seguinte , value pode receber 0 ,1 ,2 ,3
    }

    _Matou = false;
    get Matou() {
        return this._Matou;
    }
    set Matou(value) {
        this._Matou = value;
    }

    _possibilidadeErrada = 0; //nos casos em que sair por exemplo , 1 e 6 , sendo que todos os pinos estão na base , e o jogador escolhe 1 por exemplo , ele automaticamente tem que escolher o 6 primeiro só depois o 1. esta variavel recebe 0 ou 1 , 0 (não existe possibilidade errada) , 1 (existe possibilidade errada)
    get possibilidadeErrada() {
        return this._possibilidadeErrada;
    }
    set possibilidadeErrada(value) {
        this._possibilidadeErrada = value;
    }

    _dadoActual; //dado actual na qual estamos a fazer a jogada (pois existem 2 dados)
    get dadoActual() {
        return this._dadoActual;
    }
    set dadoActual(value) {
        this._dadoActual = value;
    }

    _turnoDado; //se estamos no turno do dado 1 ou no turno do dado 2
    get turnoDado() {
        return this._turnoDado;
    }
    set turnoDado(value) {
        this._turnoDado = value;
    }

    _state; //estado do dado (se ja foi rolado ou não foi rolado)
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

    _chooseDice; //variavel para ver se após rolar os dados , eles já foram escolhidos ou não
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

    _vezDados = new Array(2); // array que recebe [1 , 2] ou [2 , 1] se for a ordem de execução dos dados , por exemplo [1 , 2] o dado 1 jogará primeiro e so depois o dado 2
    get vezDados() {
        return this._vezDados;
    }
    set vezDados(value) {
        this._vezDados = value;
    }

    _diceOne = 0; //dado 1
    get diceOne() {
        return this._diceOne;
    }
    set diceOne(value) {
        this._diceOne = value;
    }

    _diceTwo = 0; //dado 2
    get diceTwo() {
        return this._diceTwo;
    }
    set diceTwo(value) {
        this._diceTwo = value;
    }

    _resultado = 0; //resultado da soma dos dados
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

        if (this._rolarDado1OuDado2OutraVez == 0) {
            this.diceOne = Math.floor((Math.random() * 6) + 1);
            this.diceTwo = Math.floor((Math.random() * 6) + 1);
            console.log("rolar 0");
        } else if (this._rolarDado1OuDado2OutraVez == 1) {
            this.diceOne = Math.floor((Math.random() * 6) + 1);
            this.chooseDice = choose.chose_dice;
            console.log("rolar 1");
        } else if (this._rolarDado1OuDado2OutraVez == 2) {
            this.diceTwo = Math.floor((Math.random() * 6) + 1);
            this.chooseDice = choose.chose_dice;
            console.log("rolar 2");
        }


        if (this._setarValorDado) {
            this.diceOne = 1;
            this.diceTwo = 6;
            this._setarValorDado = false;
        }

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

        this.state = state.dice_rolled;
        //verificar se os dados 1 ou 2 não possuem 6 e se todas peças tão na base então pular turno

        const player = players[this.turn];

        const verificarTodasPecasNaPosicaoBase = [0, 1, 2, 3].filter(piece => {
            var position = this.currentPositions[player][piece];

            if ((base_positions[player].includes(position))) {
                return true;
            }
        });


        if (this._rolarDado1OuDado2OutraVez == 0) {
            if ((verificarTodasPecasNaPosicaoBase.length === 4) && (this.diceOne !== 6) && (this.diceTwo !== 6)) {
                this.incrementTurn();
                return;
            }
        } else if (this._rolarDado1OuDado2OutraVez == 1) {
            if ((verificarTodasPecasNaPosicaoBase.length === 4) && (this.diceOne !== 6)) {
                this.incrementTurn();
                return;
            }
        } else if (this._rolarDado1OuDado2OutraVez == 2) {
            if ((verificarTodasPecasNaPosicaoBase.length === 4) && (this.diceTwo !== 6)) {
                this.incrementTurn();
                return;
            }
        }

        //


        //

        var escolhaDado = document.getElementsByClassName("escolher-dado")[0];
        var containerDice = document.getElementsByClassName("container-dice");
        if (this._rolarDado1OuDado2OutraVez == 0) {
            containerDice[0].classList.add("hover-effect");
            containerDice[1].classList.add("hover-effect");
            escolhaDado.classList.remove("ocultar");
            containerDice[0].addEventListener('click', this.handleClickContainer1.bind(this));
            containerDice[1].addEventListener('click', this.handleClickContainer2.bind(this));

            //this._rolarDado1OuDado2OutraVez = ((this.diceOne == 6) && (this.diceTwo == 6)) ? 0 : ((this.diceOne == 6) ? 1 : 2);

            if ((this.diceOne == 6) && (this.diceTwo == 6)) {
                this._rolarDado1OuDado2OutraVez = 0;
            } else if (this.diceOne == 6) {
                this._rolarDado1OuDado2OutraVez = 1;
            } else if (this.diceTwo == 6) {
                this._rolarDado1OuDado2OutraVez = 2;
            } else {
                this._rolarDado1OuDado2OutraVez = 0;
            }

        } else if (this._rolarDado1OuDado2OutraVez == 1) {

            this._rolarDado1OuDado2OutraVez = (this.diceOne == 6) ? 1 : 0;
            this.vezDados[1] = 1;
            this.checkForEligiblePieces2();

        } else if (this._rolarDado1OuDado2OutraVez == 2) {

            this._rolarDado1OuDado2OutraVez = (this.diceTwo == 6) ? 2 : 0;
            this.vezDados[1] = 2;
            this.checkForEligiblePieces2();
        }


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
        this.checkForEligiblePieces1();
    }


    checkForEligiblePieces1() {
        console.log(this.vezDados);
        this.turnoDado = 1;

        if (this.Matou) {
            this.dadoActual = 20;
            this.Matou = false;
        } else if(this._entrou){
            this.dadoActual = 10;
            this._entrou = false;
        } else {
            this.dadoActual = (this.vezDados[0] == 1) ? this.diceOne : this.diceTwo;
        }

        const player = players[this.turn];
        // eligible pieces of given player
        const eligiblePieces = this.getEligiblePieces(player);
        if (eligiblePieces.length) {
            // highlight the pieces
            UI.highlightPieces(player, eligiblePieces);
        } else {
            //this.checkForEligiblePieces2();
            console.log("n elegivel");

            if ( (this.dadoActual == 10) || (this.dadoActual == 20) ){
                this.checkForEligiblePieces2();
                return;
            }

            if (this.possibilidadeErrada === 2) {
                this.possibilidadeErrada = 0;
                this.incrementTurn();
                return;
            }

            console.log("trocou 1");
            var aux;
            aux = this.vezDados[0];
            this.vezDados[0] = this.vezDados[1];
            this.vezDados[1] = aux;
            this.possibilidadeErrada++;
            this.checkForEligiblePieces1();
        }
    }

    checkForEligiblePieces2() {
        console.log(this.vezDados);
        this.turnoDado = 2;

        if (this.Matou) {
            this.dadoActual = 20;
            this.Matou = false;
        }else if(this._entrou){
            this.dadoActual = 10;
            this._entrou = false;
        } else {
            this.dadoActual = (this.vezDados[1] == 1) ? this.diceOne : this.diceTwo;
        }

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
            var currentPosition = this.currentPositions[player][piece];

            if (currentPosition === home_positions[player]) {
                return false;
            }

            if ((base_positions[player].includes(currentPosition)) && (this.dadoActual < 6)) {
                return false;
            }

            if ((home_entrance[player].includes(currentPosition)) && (this.dadoActual > home_positions[player] - currentPosition)) {
                return false;
            }

            if ((this.dadoActual == 20) && (this.dadoActual > turning_points[player] - currentPosition + 10)) {
                return false;
            }

            if ((this.dadoActual == 20) && (base_positions[player].includes(currentPosition))) {
                return false
            }

            if ((this.dadoActual == 10) && (this.dadoActual > turning_points[player] - currentPosition + 10)) {
                return false;
            }

            if ((this.dadoActual == 10) && (base_positions[player].includes(currentPosition))) {
                return false
            }

            //

            var possibleCurrentPosition = currentPosition + this.dadoActual;
            currentPosition = (possibleCurrentPosition > 80) ? currentPosition - 80 : currentPosition;
            possibleCurrentPosition = (possibleCurrentPosition > 80) ? (possibleCurrentPosition - 80) : possibleCurrentPosition;

            var eligible = true;

            this.getPositionsWhereTwoOrMorePiecesAre().forEach(position => {
                if ((possibleCurrentPosition >= position) && (currentPosition < position)) {
                    eligible = false;
                }
            });

            if (!eligible) {
                return false;
            }

            //


            return true;
        });
    }

    getPositionsWhereTwoOrMorePiecesAre() {
        var allPositions = [];
        var positionsWhereTwoOrMorePiecesAre = [];

        Object.values(this.currentPositions).forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                allPositions.push(player[piece]);
            });
        });

        for (var i = 0; i < allPositions.length; i++) {
            var aux = 0;
            for (var j = i + 1; j < allPositions.length; j++) {
                if ((allPositions[i] == allPositions[j]) && (aux == 0)) {
                    positionsWhereTwoOrMorePiecesAre.push(allPositions[i]);
                    aux = 1;
                }
            }
        }

        return positionsWhereTwoOrMorePiecesAre;
    }

    getPositionsWhereThreeOrMorePiecesAre() {
        var allPositions = [];
        var positionsWhereThreeOrMorePiecesAre = [];

        Object.values(this.currentPositions).forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                allPositions.push(player[piece]);
            });
        });

        for (var i = 0; i < allPositions.length; i++) {
            var aux = 0;
            for (var j = i + 1; j < allPositions.length; j++) {
                if ((allPositions[i] == allPositions[j]) && (aux == 1)) {
                    positionsWhereThreeOrMorePiecesAre.push(allPositions[i]);
                    aux = 2;
                }

                if (allPositions[i] == allPositions[j]) {
                    aux++;
                }
            }
        }

        return positionsWhereThreeOrMorePiecesAre;
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
            this.setPiecePosition(player, piece, start_positions[player]);
            const isKill = this.checkForKill(player, piece);

            if (this.turnoDado === 2) {

                if (isKill) {
                    this.Matou = true;
                    UI.unhighlightPieces();
                    this.checkForEligiblePieces2();
                    return;
                }
                console.log("trocou 2");
                this.state = state.dice_not_rolled; //rodar denovo
            } else {

                if (isKill) {
                    this.Matou = true;
                    UI.unhighlightPieces();
                    this.checkForEligiblePieces1();
                    return
                }

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

                if ((home_positions[player] == (this.currentPositions[player][piece]) && (this.turnoDado == 1))) {
                    this._entrou = true;
                    this.checkForEligiblePieces1();
                    return;
                } else if ((home_positions[player] == (this.currentPositions[player][piece]) && (this.turnoDado == 2))){
                    this._entrou = true;
                    this.checkForEligiblePieces2();
                    return;
                }


                const isKill = this.checkForKill(player, piece);

                if ((isKill) && (this.turnoDado == 1)) {
                    this.Matou = true;
                    this.checkForEligiblePieces1();
                    return
                } else if ((isKill) && (this.turnoDado == 2)) {
                    this.Matou = true;
                    this.checkForEligiblePieces2();
                    return;
                }

                if ((((this.diceOne === 6) || (this.diceTwo === 6))) && (this.turnoDado === 2)) {
                    console.log("porque");
                    this.state = state.dice_not_rolled;
                    return;
                }

                if (this.turnoDado === 1) {
                    console.log("uii");
                    this.checkForEligiblePieces2();
                } else {
                    console.log("333");
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
        this._rolarDado1OuDado2OutraVez = 0;
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
                    console.log("não devia entrar aqui");
                    kill = true;
                }

                if ((currentPosition === opponentPosition)) {
                    this.getPositionsWhereThreeOrMorePiecesAre().forEach(position => {
                        if (position == currentPosition) {
                            this.setPiecePosition(opponent, piece, base_positions[opponent][piece]);
                            console.log("devia entrar aqui");
                            kill = true;
                        }
                    });
                }

            });

        });

        return kill
    }







}

const ludoGame = new Ludo();