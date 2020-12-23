'use strict';

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const classCurrentScore = document.querySelectorAll('.current-score');
const elemDice = document.querySelector('.dice');
const classesP = [
    document.querySelector('.player--0').classList,
    document.querySelector('.player--1').classList
];
const classPlayer = document.querySelectorAll('.player');
const classScore = document.querySelectorAll('.score');

let scoreP0 = 0;
let scoreP1 = 0;
let current = 0;

const players = [
    {
        score: 0,
        isTurn: true
    },
    {
        score: 0,
        isTurn: false
    }
];

//função zera valores para um novo jogo e seta o jogador 0 como o primeiro
const newGame = () => {
    for (let i = 0; i < players.length; i++) {
        classScore[i].textContent = 0;
        classCurrentScore[i].textContent = 0;
        players[i].score = 0;
    }

    current = 0;

    players[0].isTurn = true;
    players[1].isTurn = false;

    classesP[0].add('player--active');
    classesP[0].remove('player--winner');
    classesP[1].remove('player--active', 'player--winner');
    elemDice.classList.add('hidden');
}

//verifica que jogador tá na vez e passa para o outro, zerando o current
const changeTurn = () => {
    current = 0;
    for (let i = 0; i < classCurrentScore.length; i++) {
        classCurrentScore[i].textContent = current;
    }

    classesP[checkTurn()].remove('player--active');
    for (let i = 0; i < players.length; i++) {
        players[i].isTurn = !players[i].isTurn; //TRUE -> !TRUE = FALSE
    }
    classesP[checkTurn()].add('player--active');
    return players[checkTurn()];
}

//verifica quem ta na vez e retorna o índice
const checkTurn = () => {
    const indexTurn = players.findIndex((element) => {
        return element.isTurn === true;
    });
    return indexTurn;
}

//verifica se a pontuação max foi atingida
const hasWinner = () => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].score >= 100) return true;
    }
}

//chama a função para zerar valores
btnNewGame.addEventListener('click', () => {
    newGame();
});

//gera números dos dados e lógica principal do jogo
btnRoll.addEventListener('click', () => {
    if (hasWinner()) return;

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    elemDice.src = `dice-${dice}.png`;
    elemDice.classList.remove('hidden');

    //se o dado for diferente de 1, acumula a pontuação
    if (dice != 1) {
        current += dice;
        console.log(current);
        document.querySelector(`#current--${checkTurn()}`).textContent = current;
    }
    //se o dado for igual a 1, passa a vez
    else {
        changeTurn();
        // console.log('agora vez do jogador ' + checkTurn()+ 1);
    }
});

//guarda o score do jogador e passa a vez
btnHold.addEventListener('click', () => {
    if (hasWinner()) return;

    const turn = checkTurn();
    players[turn].score += current;
    document.querySelector(`#score--${turn}`).textContent = players[turn].score;

    if (players[turn].score >= 100) {
        classPlayer[turn].classList.add('player--winner');
    }

    changeTurn();
});

newGame();