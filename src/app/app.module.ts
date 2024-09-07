import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { BrowserModule } from '@angular/platform-browser';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { AppRoutingModule } from './app-routing.module';
import { TileComponent } from './tile/tile.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [AppComponent, GameBoardComponent, GameOfLifeComponent, TileComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
