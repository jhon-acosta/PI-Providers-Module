import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  exports: [
    ModuleProvidersComponent
  ]
})
export class ModuleProvidersModule { }
