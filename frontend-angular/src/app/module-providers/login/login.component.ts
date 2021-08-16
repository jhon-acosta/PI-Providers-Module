import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginI, RoleI } from '../interfaces/Interfaces';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: LoginI = { email: undefined, password: undefined }
  check = false
  remember = false
  constructor(
    private auth: AngularFireAuth,
    private _login: LoginService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  async authGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response: any) => {
      this.data = {
        ...this.data,
        email: response.additionalUserInfo.profile.email,
      }
      return this.toastr.info('Su contraseña registrada', 'Ingrese, por favor');
    })
    .catch(err => {
      return this.toastr.error('Cuenta no seleccionada', 'Error');
    })
  }

  async login() {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.data.email) ||
      this.data.email == ''
    ) {
      return this.toastr.error('Correo electrónico inválido', 'Ops!');
    } else if (!this.data.password) {
      return this.toastr
        .error('Contraseña inválido', 'Ops!')
    }
    this._login.login(this.data).subscribe((
      response: { data: { token: string, role: string }, message: string }) => {
      if (response.message === 'unregistered mail') {
        this.toastr.warning('Usuario no registrado', 'Ops!');
      } else if (localStorage.getItem('tokenEcuShopping')) {
        localStorage.removeItem('tokenEcuShopping');
      }
      this.check = true
      localStorage.setItem('tokenEcuShopping', response.data.token)
      this.toastr.success('Inicio exitosó', '');
      if (response.data.role === 'Comprador') {
        // ruta de compador a se añadida
        // this.router.navigate(['/moduleProviders/provider/home']);
        alert('se redirecciona a HOME de COMPRADOR')
      } else if (response.data.role === 'Proveedor') {
        this.router.navigate(['/moduleProviders/provider/home']);
      }
    }, error => {
      return this.toastr.warning('Correo electrónico inválido', 'Ops!');
    })
  }

  rememberAccount() {
    this.remember = !this.remember
    if (this.remember && this.data.email) {
      localStorage.setItem('EmailEcuShopping', this.data.email)
    } else {
      localStorage.removeItem('EmailEcuShopping')
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('EmailEcuShopping')) {
      this.remember = true
      this.data.email = localStorage.getItem('EmailEcuShopping')
    }
  }
}
