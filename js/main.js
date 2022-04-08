
const COLORS = {
  '0': 'white',
  '1': 'Blue',
  '-1': 'Red'
};


let board;  
let turn;  
let winner;


const markerEls = [...document.querySelectorAll('#markers > div')];
const resetBtn = document.querySelector('button')
const turnMsg = document.getElementById('turnMsg')
const winMsg = document.getElementById('winMsg')

document.getElementById('markers').addEventListener('click', handleDrop);
resetBtn.addEventListener('click', init);


init();


function init() {
  console.log('hello');
  board = [
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
  ];
  turn = 1;
  render();
}

function render() {

  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
  renderMarkers();

  turnMsg.innerText = `${COLORS[turn]} player`;
  if (winner) winMsg.innerText = `${COLORS[turn *-1]} player wins!`;
}


function renderMarkers() {
  markerEls.forEach(function(markerEl, colIdx) {
    markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
  });
}

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

function checkHorzWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  let idx = rowIdx + 1; 
  while (idx < board[idx].length && board[colIdx][idx] === player) {
    count++;
    idx++;
  }
  idx = rowIdx - 1; 
  while (idx >= 0 && board[colIdx][idx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? winner = player : null; 
}

function checkVertWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  let idx = colIdx + 1;
  while (idx < board.length && board[idx][rowIdx] === player) {
    count++;
    idx++;
  }
  idx = colIdx - 1;
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
  let idx1 = colIdx - 1;
  let idx2 = rowIdx + 1;
  while (idx1 >= 0  && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1;
  idx2 = rowIdx - 1
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  return count === 4 ? winner = player : null;
}