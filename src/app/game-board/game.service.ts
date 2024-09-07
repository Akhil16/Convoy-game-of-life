import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, from, Observable, of } from 'rxjs';
import { switchMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly boardSize = 10;
  private board: number[][] = [];
  private readonly candyTypes = 50;

  public board$ = new BehaviorSubject<number[][]>(this.board);
  public gameOver$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    this.board = Array.from({ length: this.boardSize }, () =>
      Array.from({ length: this.boardSize }, () => Math.floor(Math.random() * this.candyTypes))
    );
    this.board$.next(this.board);
  }

  async swapCandies(x1: number, y1: number, x2: number, y2: number) {
    if (this.isValidSwap(x1, y1, x2, y2)) {
      const temp = this.board[y1][x1];
      this.board[y1][x1] = this.board[y2][x2];
      this.board[y2][x2] = temp;

      const matches = await firstValueFrom(this.processMatches());
      if (matches.length > 0) {
        this.removeMatches(matches);
        await this.dropCandies();
      } else {
        this.board[y2][x2] = this.board[y1][x1];
        this.board[y1][x1] = temp;
      }
      this.board$.next(this.board);
    }
  }

  private isValidSwap(x1: number, y1: number, x2: number, y2: number) {
    return (
      (Math.abs(x1 - x2) === 1 && y1 === y2) ||
      (Math.abs(y1 - y2) === 1 && x1 === x2)
    );
  }

  private processMatches(): Observable<{ x: number; y: number }[]> {
    return from(this.board).pipe(
      switchMap((row, y) =>
        from(row).pipe(
          switchMap((candy, x) => {
            if (candy === undefined) return of([]);
            const horizontalMatch = x <= this.boardSize - 3 &&
              this.board[y].slice(x, x + 3).every(cell => cell === candy);
            const verticalMatch = y <= this.boardSize - 3 &&
              [this.board[y][x], this.board[y + 1][x], this.board[y + 2][x]].every(cell => cell === candy);

            return of([
              ...horizontalMatch ? Array.from({ length: 3 }, (_, i) => ({ x: x + i, y })) : [],
              ...verticalMatch ? Array.from({ length: 3 }, (_, i) => ({ x, y: y + i })) : []
            ]);
          }),
          switchMap(matches => from(matches)),
          toArray()
        )
      )
    );
  }

  private removeMatches(matches: { x: number; y: number }[]) {
    matches.forEach(({ x, y }) => {
      this.board[y][x] = -1;
    });
  }

  private async dropCandies() {
    await Promise.all(
      Array.from({ length: this.boardSize }).map(async (_, x) => {
        let emptySpace = this.boardSize - 1;

        this.board.forEach((row, y) => {
          if (row[x] === -1) {
            emptySpace = Math.min(emptySpace, y);
          } else {
            if (y !== emptySpace) {
              this.board[emptySpace][x] = row[x];
              this.board[y][x] = -1;
            }
            emptySpace--;
          }
        });

        Array.from({ length: emptySpace + 1 }).forEach((_, y) => {
          this.board[y][x] = Math.floor(Math.random() * this.candyTypes);
        });
      })
    );

    this.board$.next(this.board);
  }
}
