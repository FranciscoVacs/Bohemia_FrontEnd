import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GaleriaComponent } from './galeria/galeria.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'galeria', component: GaleriaComponent },
];
