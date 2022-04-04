/*----- constants -----*/




/*----- app's state (variables) -----*/
let winner;
let gameBoard;
let turn;



/*----- cached element references -----*/
const squares = document.querySelectorAll('td div');
const message = document.querySelector('h1');
const resetBtn = document.getElementById('reset-btn');



/*----- event listeners -----*/

document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);


/*----- functions -----*/