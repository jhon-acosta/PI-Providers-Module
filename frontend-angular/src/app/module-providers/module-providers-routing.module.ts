import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProviderComponent } from './home-provider/home-provider.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RememberPasswordComponent } from './remember-password/remember-password.component';

const routes: Routes = [
  { path: 'moduleProviders/provider/home', component: HomeProviderComponent },
  { path: 'moduleProviders/register', component: RegisterComponent },
  { path: 'moduleProviders/login', component: LoginComponent },
  { path: 'moduleProviders/rememberPassword', component: RememberPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModuleProvidersRoutingModule { }
