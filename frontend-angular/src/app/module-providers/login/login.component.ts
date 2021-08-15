import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginI } from '../interfaces/Interfaces';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: LoginI = {
    email: undefined,
    password: undefined
  }
  check = false
  constructor(
    private auth: AngularFireAuth,
    private _login: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  async authGoogle(){
    try {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.auth.authState.subscribe((user) => {
        console.log(user);
        this.toastr.success('Hello world!', 'Toastr fun!');
      });
    } catch (error) {
      this.toastr.success('Hello world!', 'Toastr fun!');
      console.log(error.message)
    }
  }

  async login() {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.data.email) ||
      this.data.email == ''
    ) {
      return this.toastr.error('Correo electrónico inválido', 'Ops!');
    } else if (!this.data.password) {
      return this.toastr.error('Contraseña inválido', 'Ops!');
    }
    this._login.login(this.data).subscribe((
      response: { data: { token: string }, message: string }) => {
      if (response.message === 'unregistered mail') {
        this.toastr.error('Usuario no registrado', 'Ops!');
      }
      if (localStorage.getItem('tokenEcuShopping')) {
        localStorage.removeItem('tokenEcuShopping');
      }
      localStorage.setItem('tokenEcuShopping', response.data.token)
      this.toastr.success('Usuario no registrado', 'Ops!');
      this.check = true 
    }, error => {
      return this.toastr.error('Correo electrónico inválido', 'Ops!');
    })
  }

  ngOnInit(): void {
  }

}
