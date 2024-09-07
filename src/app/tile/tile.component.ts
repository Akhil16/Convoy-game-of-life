// tile.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() isAlive = false; // Input to determine if the tile is alive
  @Input() number: any;
  @Input() row: any;
  @Input() column: any;

  toggleState() {
    // this.isAlive = !this.isAlive;
  }
}
