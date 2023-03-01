import {Cell} from "./Cell";

export class Board {
	cells: Array<Array<Cell>> = [];

	staticNextGen = false;

	boardWidth: number;

	boardHeight: number;

	constructor(width = 64, height = 64) {
		this.boardWidth = width;
		this.boardHeight = height;
	}

	public initCells() {
		for (let i = 0; i < this.boardHeight; i++) {
			const row: Array<Cell> = [];

			for (let j = 0; j < this.boardWidth; j++) {
				row.push(new Cell(
					j,
					i,
				));
			}

			this.cells.push(row);
		}
	}

	public getCopyBoard() {
		const newBoard = new Board(this.boardWidth, this.boardHeight);
		newBoard.cells = this.cells;
		newBoard.staticNextGen = this.staticNextGen;
		newBoard.boardWidth = this.boardWidth;
		newBoard.boardHeight = this.boardHeight;

		return newBoard;
	}

	public setNextGeneration() {
		const newBoard = new Board(this.boardWidth, this.boardHeight);

		newBoard.initCells();

		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];

			for (let j = 0; j < row.length; j++) {
				const cell = row[j];
				const aliveNeighbours: Array<Cell> = [];
				let aliveNeighboursNum = 0;

				if (i !== 0) {
					aliveNeighbours.push(this.cells[i - 1][j]);
				}

				if (i !== 0 && j !== 0) {
					aliveNeighbours.push(this.cells[i - 1][j - 1]);
				}

				if (j !== 0) {
					aliveNeighbours.push(this.cells[i][j - 1]);
				}

				if (i !== this.cells.length - 1) {
					aliveNeighbours.push(this.cells[i + 1][j]);
				}

				if (i !== this.cells.length - 1 && j !== row.length - 1) {
					aliveNeighbours.push(this.cells[i + 1][j + 1]);
				}

				if (j !== row.length - 1) {
					aliveNeighbours.push(this.cells[i][j + 1]);
				}

				if (i !== 0 && j !== row.length - 1) {
					aliveNeighbours.push(this.cells[i - 1][j + 1]);
				}

				if (i !== this.cells.length - 1 && j !== 0) {
					aliveNeighbours.push(this.cells[i + 1][j - 1]);
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
	}

	public setRandomFirstGen() {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];

			for (let j = 0; j < row.length; j++) {
				const cell = row[j];

				cell.setAlive(Math.random() > 0.5);
			}
		}
	}
}
