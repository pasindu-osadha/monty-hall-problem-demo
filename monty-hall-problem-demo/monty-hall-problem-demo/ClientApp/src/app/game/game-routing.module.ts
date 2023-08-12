import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';



export const GAME_ROUTES: Routes = [{
  path: '', children: [
    { path: '', component: HomeComponent },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(GAME_ROUTES)],
  exports: [RouterModule]
})

export class GameRoutingModule { }
