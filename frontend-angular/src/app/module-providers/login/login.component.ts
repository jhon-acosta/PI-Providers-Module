import { Component, OnInit } from '@angular/core';
import { AuthgoogleService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthgoogleService) { }
  AuthGoogle(){
    this._auth.googleAuth()
  }

  ngOnInit(): void {
  }

}
