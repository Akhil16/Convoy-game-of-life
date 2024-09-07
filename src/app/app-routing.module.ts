import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

const routes: Routes = [
  { path: 'tile', component: GameBoardComponent },
  { path: 'life', component: GameOfLifeComponent },
  { path: '', redirectTo: '/life', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
