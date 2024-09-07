import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  board: number[][] = [];
  selected: { x: number; y: number } | null = null;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.board$.subscribe(board => this.board = board);
  }

  onClick(x: number, y: number) {
    if (this.selected) {
      const { x: x1, y: y1 } = this.selected;
      this.gameService.swapCandies(x1, y1, x, y);
      this.selected = null;
    } else {
      this.selected = { x, y };
    }
  }

  getCandyColor(type: number): string {
    const colors = ['#e8f4f8', '#d1eaf2', '#b9e1ec', '#a2d7e6', '#8bcde0', '#74c4da', '#5dbad4', '#46b0ce', '#2fa6c8', '#189cc2', '#0192bc', '#0088b6', '#007eaf', '#0074a9', '#006aa3', '#00609d', '#005694', '#004c8e', '#004284', '#00387e'];
    return colors[type] || '#fff';
  }
}
