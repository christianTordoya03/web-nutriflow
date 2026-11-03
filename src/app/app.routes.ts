import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DiarioPageComponent } from './pages/diario/diario';
import { ConocenosPageComponent } from './pages/conocenos/conocenos'; // Asegúrate de importar el componente

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'diario', component: DiarioPageComponent },
  { path: 'conocenos', component: ConocenosPageComponent }, // Nueva ruta añadida
  { path: '**', redirectTo: '' }
];