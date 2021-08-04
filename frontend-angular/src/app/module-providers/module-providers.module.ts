import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ModuleProvidersRoutingModule } from './module-providers-routing.module';
import { ModuleProvidersComponent } from './module-providers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';


@NgModule({
  declarations: [
    ModuleProvidersComponent,
    RegisterComponent,
    LoginComponent,
    HomeProviderComponent,
  ],
  imports: [
    CommonModule,
    ModuleProvidersRoutingModule,
    FormsModule
  ],
  exports: [
    ModuleProvidersComponent
  ]
})
export class ModuleProvidersModule { }