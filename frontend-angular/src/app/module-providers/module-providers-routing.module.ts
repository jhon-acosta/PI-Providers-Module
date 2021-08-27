import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { LoginComponent } from './login/login.component';
import { ProfileProviderComponent } from './profile-provider/profile-provider.component';
import { RegisterComponent } from './register/register.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';

import { LoginGuard } from './guards/login.guard';
import { ProviderGuard } from './guards/provider.guard';

const routes: Routes = [
  {
    path: 'moduleProviders/provider/home',
    canActivate:[LoginGuard],
    component: HomeProviderComponent 
  },
  {
    path: 'moduleProviders/register',
    canActivate:[ProviderGuard],
    component: RegisterComponent
  },
  { 
    path: 'moduleProviders/login',
    canActivate:[ProviderGuard],
    component: LoginComponent
  },
  { 
    path: 'moduleProviders/rememberPassword',
    canActivate:[ProviderGuard],
    component: RememberPasswordComponent 
  },
  { path: 'moduleProviders/profile-user',
    canActivate:[LoginGuard],
    component: ProfileProviderComponent 
  },
  {
    path: 'moduleProviders/profile-user/edit/:id',
    canActivate:[LoginGuard],
    component:EditProviderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModuleProvidersRoutingModule { }
