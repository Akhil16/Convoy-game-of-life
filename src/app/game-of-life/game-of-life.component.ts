import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.scss'
})
export class GameOfLifeComponent implements OnInit {

  grid: number[][] = [];
  rows = 25;
  columns = 15;
  intervel: any;
  state: 'start' | 'paused' | 'reset' | 'stable' = 'paused';
  generation: number = 0;
  subscription!: Subscription;
  interval: any = 1000;

  ngOnInit() {
    this.grid = this.initialize(this.rows, this.columns);
  }

  initialize(rows: number = this.rows, columns: number = this.columns): number[][] {
    // Create a grid initialized with zeros
    return Array.from({ length: rows }, () => Array(columns).fill(0));
  }

  startGame() {
    this.state = 'start';
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = interval(this.interval).subscribe(() => {
      this.nextGeneration();
    });
  }


  nextGeneration() {
    const newGrid = this.grid.map((row, y) =>
      row.map((cell, x) => {
        const aliveNeighbors = this.countAliveNeighbors(x, y);
        if (cell === 1) {
          return (aliveNeighbors === 2 || aliveNeighbors === 3) ? 1 : 0;
        } else {
          return (aliveNeighbors === 3) ? 1 : 0;
        }
      })
    );
    this.grid = newGrid;
    this.generation++;
  }

  countAliveNeighbors(x: number, y: number): number {
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    return neighbors.reduce((count, [dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < this.columns && ny >= 0 && ny < this.rows) {
        return count + (this.grid[ny][nx] === 1 ? 1 : 0);
      }
      return count;
    }, 0);
  }

  toggleState(x: number, y: number) {
    this.grid[y][x] = this.grid[y][x] === 1 ? 0 : 1;
  }


  resetGame() {
    this.pauseGame();
    this.grid = this.grid.map(row => row.map(() => 0));
    this.state = 'reset';
    this.generation = 0;
  }

  pauseGame() {
    this.state = 'paused';
    this.subscription.unsubscribe();
  }

  randomise() {
    this.grid = this.grid.map(row => row.map(() => Math.random() > 0.5 ? 1 : 0));
  }

}
