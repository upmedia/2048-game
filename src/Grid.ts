const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
  #cells: Cell[];

  constructor(gridElemnet: HTMLElement | null) {
    gridElemnet?.style.setProperty('--grid-size', `${GRID_SIZE}`);
    gridElemnet?.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElemnet?.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);

    this.#cells = createCellElements(gridElemnet).map((cellElement, index: number ) => {
      return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE));
    });
  }

  get cellsByColumn() {
    return this.#cells.reduce((cellGrid: Cell[], cell: Cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;

      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid: Cell[], cell: Cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;

      return cellGrid;
    }, [])
  }

  get #emptyCells(): Cell[] {
    return this.#cells.filter((cell: Cell) => {
      return cell.tile == null;
    });
  }

  randomEmptyCell(): Cell {
    const randomIndex: number = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells[randomIndex];
  }
}

type Tile = any;

class Cell {
  #cellElement: HTMLElement;
  #x: number;
  #y: number;
  #tile: Tile | null = null;
  #mergeTile: Tile;

  constructor(cellElement: HTMLElement, x: number, y: number) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x
  }

  get y() {
    return this.#y
  }

  get tile() {
    return this.#tile
  }

  get mergeTile() {
    return this.#mergeTile
  }

  set mergeTile(value: Tile) {
    this.#mergeTile = value;
    if (value == null) return
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  set tile(value: Tile) {
    this.#tile = value;
    if (value == null) return

    this.#tile.x = this.#x
    this.#tile.y = this.#y
    // this.#cellElement.append(tile?.tileElement);
  }

  canAcceptTile(tile: Tile): boolean {
    return this.#tile == null || (this.mergeTile == null && this.tile.value === tile.value);
  }
}

const createCellElements = (gridElemnet: HTMLElement) => {
  const cells: HTMLElement[] = [];

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell: HTMLElement = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    gridElemnet.append(cell);
  }

  return cells;
}
