import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SimulateComponent } from './component/simulate/simulate.component';



export const GAME_ROUTES: Routes = [{
  path: '', children: [
    { path: '', component: SimulateComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(GAME_ROUTES)],
  exports: [RouterModule]
})

export class GameRoutingModule { }
