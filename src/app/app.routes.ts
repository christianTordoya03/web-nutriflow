import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DiarioPageComponent } from './pages/diario/diario';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'diario', component: DiarioPageComponent },
  { path: '**', redirectTo: '' }
];