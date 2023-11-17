import './style.css'

import Grid from './Grid.ts'
import Tile from './Tile.ts'

const gameBoard: HTMLElement = document.getElementById('game-board')

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInout();

// console.log(grid.cellsByColumn);

function setupInout() {
  window.addEventListener('keydown', handleInput, { once: true })
}

function handleInput(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
    default:
      setupInout();
      return;
  }

  // other code
  setupInout();
}

function moveUp() {
  console.log('move up')
  slideTiles(grid.cellsByColumn);
}
function moveDown() {
  console.log('move down')
  slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}
function moveLeft() {
  console.log('move left')
  slideTiles(grid.cellsByRow);
}
function moveRight() {
  console.log('move right')
  slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function slideTiles(cells: Cell[][]) {
  cells.forEach((group: Cell[]) => {
    for (let i = 0; i < group.length; i++) {
      const cell: Cell = group[i];

      if (cell.tile == null) continue;

      let lastValidCell: Cell;

      for (let j = i - 1; j >= 0; j--) {
        const moveToCell: Cell = group[j];


        if (!moveToCell.canAcceptTile(cell.tile)) break;
        lastValidCell = moveToCell;
      }

      if (lastValidCell != null) {
        if (lastValidCell.tile != null) {
          lastValidCell.mergeTile = cell.tile;
        } else {
          lastValidCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
  })
}






