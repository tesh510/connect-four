/*----- constants -----*/
const COLORS = {
  '0': 'white',
  '1': 'Blue',
  '-1': 'Red'
};

/*----- app's state (variables) -----*/
let board;  // 2D Array where the nested arrays rep the columns
let turn;  // 1 or -1; 0 for nobody home in that cell
let winner;

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const resetBtn = document.querySelector('h3')
const message = document.querySelector('p')

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
resetBtn.addEventListener('click', init);

/*----- functions -----*/
init();

// initialize state, then call render()
function init() {
  console.log('hello');
  board = [
    [0, 0, 0, 0, 0, 0],  // column 0
    [0, 0, 0, 0, 0, 0],  // column 1
    [0, 0, 0, 0, 0, 0],  // column 2
    [0, 0, 0, 0, 0, 0],  // column 3
    [0, 0, 0, 0, 0, 0],  // column 4
    [0, 0, 0, 0, 0, 0],  // column 5
    [0, 0, 0, 0, 0, 0],  // column 6
  ];
  turn = 1;
  render();
}

function render() {
  // Iterate over the column arrays
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
  renderMarkers();

  turnMsg.innerText = `${COLORS[turn]}player`;

}

// hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
  markerEls.forEach(function(markerEl, colIdx) {
    markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
  });
}

// function renderWinner(player) {
//   message.innerHTML = `The winner is ${COLORS[player]}!`;
//   resetBtn.style.visibility = 'visible';
//   winner = true;
// }

// Update all impacted state, then call render
function handleDrop(evt) {
  const colIdx = markerEls.indexOf(evt.target);
  if (winner) return;
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  turn *= -1;
  getWinner(colIdx, rowIdx)
  render();
}



// reverse this (would be horizontal check)
function checkHorzWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count up
  let idx = rowIdx + 1; // initialize to one above 
  while (idx < board[idx].length && board[colIdx][idx] === player) {
    count++;
    idx++;
  }
  idx = rowIdx - 1; // initialize to one above 
  while (idx >= 0 && board[colIdx][idx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? winner = player : null; 
}



function checkVertWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx = colIdx + 1; // initialize to one above 
  while (idx < board.length && board[idx][rowIdx] === player) {
    count++;
    idx++;
  }
  idx = colIdx - 1; // initialize to one above 
  while (idx >= 0 && board[idx][rowIdx] === player) {
    count++;
    idx--;
  }
  return count >= 4 ? winner = player : null;
}


function getWinner(colIdx, rowIdx) {
  return checkVertWin(colIdx, rowIdx)
    || checkHorzWin(colIdx, rowIdx)
    || checkForwardSlash(colIdx, rowIdx)

}
function checkForwardSlash(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx1 = colIdx - 1;// initialize to one above 
  let idx2 = rowIdx + 1;
  while (idx1 >= 0  && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1; // initialize to one above 
  idx2 = rowIdx - 1
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  return count === 4 ? winner = player : null;
}