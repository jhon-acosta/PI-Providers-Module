import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { ModuleProvidersRoutingModule } from './module-providers-routing.module';
import { ModuleProvidersComponent } from './module-providers.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { ProfileProviderComponent } from './profile-provider/profile-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';

// Interceptors
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    ModuleProvidersComponent,
    RegisterComponent,
    LoginComponent,
    HomeProviderComponent,
    RememberPasswordComponent,
    ProfileProviderComponent,
    EditProviderComponent,
  ],
  imports: [
    CommonModule,
    ModuleProvidersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModuleProvidersComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    }
  ]
})
export class ModuleProvidersModule { }
