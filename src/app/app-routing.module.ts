import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/info/info.component';
import { PastelComponent } from './pages/pastel/pastel.component';
import { HistogramaComponent } from './pages/histograma/histograma.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'informacion', component: InformacionComponent, canActivate: [AuthGuard]  },
  { path: 'pastel', component: PastelComponent, canActivate: [AuthGuard] },
  { path: 'histograma', component: HistogramaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
