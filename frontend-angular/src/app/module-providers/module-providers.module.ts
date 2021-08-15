import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { ModuleProvidersComponent } from './module-providers.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { ModuleProvidersRoutingModule } from './module-providers-routing.module';
import { RememberPasswordComponent } from './remember-password/remember-password.component';
import { ProfileProviderComponent } from './profile-provider/profile-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Interceptors
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeProviderComponent,
    ModuleProvidersComponent,
    RememberPasswordComponent,
    ProfileProviderComponent,
    EditProviderComponent,
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    ModuleProvidersRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
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
