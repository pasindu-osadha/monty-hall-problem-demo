import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
