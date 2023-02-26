export class Cell {
  readonly x: number;

  readonly y: number;

  isAlive: boolean;

  id: string;

  constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
    this.isAlive = false;
    this.id = String(x) + String(y);
  }

  public setAlive(isAlive: boolean) {
    this.isAlive = isAlive;
  }
}
