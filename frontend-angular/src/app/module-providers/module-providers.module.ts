import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ModuleProvidersRoutingModule } from './module-providers-routing.module';
import { ModuleProvidersComponent } from './module-providers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [
    ModuleProvidersComponent,
    RegisterComponent,
    LoginComponent,
    HomeProviderComponent,
    RememberPasswordComponent,
  ],
  imports: [
    CommonModule,
    ModuleProvidersRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  exports: [
    ModuleProvidersComponent
  ]
})
export class ModuleProvidersModule { }
