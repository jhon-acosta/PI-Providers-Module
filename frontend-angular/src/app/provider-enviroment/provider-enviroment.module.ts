import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProviderEnviromentComponent } from './provider-enviroment.component';
import { ProviderEnviromentRoutingModule } from './provider-enviroment-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ProviderEnviromentComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ProviderEnviromentRoutingModule,

  ],
  exports: [
    ProviderEnviromentComponent
  ]
})
export class ProviderEnviromentModule { }
