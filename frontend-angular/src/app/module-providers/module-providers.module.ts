import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { ModuleProvidersComponent } from './module-providers.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { ModuleProvidersRoutingModule } from './module-providers-routing.module';
import { RememberPasswordComponent } from './remember-password/remember-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeProviderComponent,
    ModuleProvidersComponent,
    RememberPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    ModuleProvidersRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [
    ModuleProvidersComponent
  ]
})
export class ModuleProvidersModule { }
