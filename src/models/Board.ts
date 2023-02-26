import {Cell} from "./Cell";

export class Board {
  cells: Array<Array<Cell>> = [];

  staticNextGen = false;

  public initCells() {
    for (let i = 0; i < 64; i++) {
      const row: Array<Cell> = [];

      for (let j = 0; j < 64; j++) {
        row.push(new Cell(
          j,
          i,
        ));
      }

      this.cells.push(row);
    }
  }

  public getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.staticNextGen = this.staticNextGen;

    return newBoard;
  }

  public getNextGeneration() {
    const newBoard = new Board();

    newBoard.initCells();

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const aliveNeighbours: Array<Cell> = [];
        let aliveNeighboursNum = 0;

        if (i !== 0) {
          aliveNeighbours.push(this.cells[i-1][j]);
        }

        if (i !== 0 && j !== 0) {
          aliveNeighbours.push(this.cells[i-1][j-1]);
        }

        if (j !== 0) {
          aliveNeighbours.push(this.cells[i][j-1]);
        }

        if (i !== this.cells.length - 1) {
          aliveNeighbours.push(this.cells[i+1][j]);
        }

        if (i !== this.cells.length - 1 && j !== row.length - 1) {
          aliveNeighbours.push(this.cells[i+1][j+1]);
        }

        if (j !== row.length - 1) {
          aliveNeighbours.push(this.cells[i][j+1]);
        }

        if (i !== 0 && j !== row.length - 1) {
          aliveNeighbours.push(this.cells[i-1][j+1]);
        }

        if (i !== this.cells.length - 1 && j !== 0) {
          aliveNeighbours.push(this.cells[i+1][j-1]);
        }

        for (const aliveNeighbour of aliveNeighbours) {
          if (aliveNeighbour.isAlive) {
            aliveNeighboursNum++;
          }
        }

        if (!cell.isAlive && aliveNeighboursNum === 3) {
          newBoard.cells[i][j].setAlive(true);
        }

        if (cell.isAlive && (aliveNeighboursNum === 2 || aliveNeighboursNum === 3)) {
          newBoard.cells[i][j].setAlive(true);
        }
      }
    }

    if (JSON.stringify(newBoard.cells) === JSON.stringify(this.cells)) {
      this.staticNextGen = true;
      newBoard.staticNextGen = true;
    }

    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      const newRow = newBoard.cells[i];

      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const newCell = newRow[j];

        cell.setAlive(newCell.isAlive);
      }
    }

    return newBoard;
  }
}
