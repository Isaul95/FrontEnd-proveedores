import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'listar',
    component: ListarComponent,
    pathMatch: 'full'
  },
  {
    path:'agregar',
    component: AgregarComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
