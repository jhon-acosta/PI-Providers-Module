import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProviderEnviromentComponent } from './provider-enviroment.component';

const routes: Routes = [

  { path: 'moduleProviders/provider/enviroment', component: ProviderEnviromentComponent }, // <= home
  { path: 'moduleProviders/provider/enviroment/home', component: HomeComponent }, // <= home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProviderEnviromentRoutingModule { }
