
//área dos dados

var diceOne, diceTwo;
var resultado = 0; //variaveis onde ficam armazenados os valores dos dados

function rollDice() {
  var dice1 = document.getElementById('dice1');
  var dice2 = document.getElementById('dice2');
  var rollButton = document.getElementById('roll');

  diceOne = Math.floor((Math.random() * 6) + 1);
  diceTwo = Math.floor((Math.random() * 6) + 1);
  resultado = diceOne + diceTwo;
  console.log(diceOne + ' ' + diceTwo);
  for (var i = 1; i <= 6; i++) {
    dice1.classList.remove('show-' + i);
    if (diceOne === i) {
      dice1.classList.add('show-' + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    dice2.classList.remove('show-' + k);
    if (diceTwo === k) {
      dice2.classList.add('show-' + k);
    }
  }

}



/*const piece = document.getElementById('piece');

// Função para mover a peça para a célula específica
function movePiece(targetCell) {
  const targetPosition = targetCell.getBoundingClientRect(); // Obtém as coordenadas da célula de destino
  piece.style.left = targetPosition.left + 'px'; // Define a posição horizontal da peça
  piece.style.top = targetPosition.top + 'px'; // Define a posição vertical da peça
}

const cells = document.querySelectorAll('.cell');

// Adiciona um event listener de clique a cada célula
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener('click', function() {
    movePiece(cell); // Move a peça para a célula clicada
  });
}*/

var colocarDadosPlayer1 = document.getElementsByClassName("player-1")[0];
var colocarDadosPlayer2 = document.getElementsByClassName("player-2")[0];
var colocarDadosPlayer3 = document.getElementsByClassName("player-3")[0];
var colocarDadosPlayer4 = document.getElementsByClassName("player-4")[0];

var startRed = document.getElementsByClassName("start-red")[0];
var startGreen = document.getElementsByClassName("start-green")[0];
var startBlue = document.getElementsByClassName("start-blue")[0];
var startYellow = document.getElementsByClassName("start-yellow")[0];

var dadosHTML = `<div class="container-dice">
  <div id='dice1' class="dice dice-one">
    <div id="dice-one-side-one" class='side one'>
      <div class="dot one-1"></div>
    </div>
    <div id="dice-one-side-two" class='side two'>
      <div class="dot two-1"></div>
      <div class="dot two-2"></div>
    </div>
    <div id="dice-one-side-three" class='side three'>
      <div class="dot three-1"></div>
      <div class="dot three-2"></div>
      <div class="dot three-3"></div>
    </div>
    <div id="dice-one-side-four" class='side four'>
      <div class="dot four-1"></div>
      <div class="dot four-2"></div>
      <div class="dot four-3"></div>
      <div class="dot four-4"></div>
    </div>
    <div id="dice-one-side-five" class='side five'>
      <div class="dot five-1"></div>
      <div class="dot five-2"></div>
      <div class="dot five-3"></div>
      <div class="dot five-4"></div>
      <div class="dot five-5"></div>
    </div>
    <div id="dice-one-side-six" class='side six'>
      <div class="dot six-1"></div>
      <div class="dot six-2"></div>
      <div class="dot six-3"></div>
      <div class="dot six-4"></div>
      <div class="dot six-5"></div>
      <div class="dot six-6"></div>
    </div>
  </div>
</div>
<div class="container-dice">
  <div id='dice2' class="dice dice-two">
    <div id="dice-two-side-one" class='side one'>
      <div class="dot one-1"></div>
    </div>
    <div id="dice-two-side-two" class='side two'>
      <div class="dot two-1"></div>
      <div class="dot two-2"></div>
    </div>
    <div id="dice-two-side-three" class='side three'>
      <div class="dot three-1"></div>
      <div class="dot three-2"></div>
      <div class="dot three-3"></div>
    </div>
    <div id="dice-two-side-four" class='side four'>
      <div class="dot four-1"></div>
      <div class="dot four-2"></div>
      <div class="dot four-3"></div>
      <div class="dot four-4"></div>
    </div>
    <div id="dice-two-side-five" class='side five'>
      <div class="dot five-1"></div>
      <div class="dot five-2"></div>
      <div class="dot five-3"></div>
      <div class="dot five-4"></div>
      <div class="dot five-5"></div>
    </div>
    <div id="dice-two-side-six" class='side six'>
      <div class="dot six-1"></div>
      <div class="dot six-2"></div>
      <div class="dot six-3"></div>
      <div class="dot six-4"></div>
      <div class="dot six-5"></div>
      <div class="dot six-6"></div>
    </div>
  </div>
</div>
<div id='roll' class='roll-button' onclick="rollDice()"><button>Roll dice!</button></div>`

//

// Função para mover a peça para a célula específica
function movePiece(targetCell) {
  const targetPosition = targetCell.getBoundingClientRect(); // Obtém as coordenadas da célula de destino
  piece.style.left = targetPosition.left + 'px'; // Define a posição horizontal da peça
  piece.style.top = targetPosition.top + 'px'; // Define a posição vertical da peça
}

const cells = document.querySelectorAll('.cell');

// Adiciona um event listener de clique a cada célula
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener('click', function() {
    movePiece(cell); // Move a peça para a célula clicada
  });
}




  



















