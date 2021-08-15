import firebase from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginI } from '../interfaces/Interfaces';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AngularFireAuth, private _login: LoginService,private router: Router) { }

  async authGoogle(){
    try {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.auth.authState.subscribe((user) => {
        console.log(user);
      });
    } catch (error) {
      console.log(error)      
    }
  }

  async login () {
    try {
      this._login.login(this.data).subscribe((
        response: {data: {token:string}}) => {
        if(localStorage.getItem('tokenEcuShopping')) {
          localStorage.removeItem('tokenEcuShopping');
        }
        localStorage.setItem('tokenEcuShopping', response.data.token);
        this.router.navigateByUrl('/moduleProviders/profile-user');
      })
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
  }

}
