import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-provider.component.html',
  styleUrls: ['./home-provider.component.css']
})
export class HomeProviderComponent implements OnInit {

  user: string
  constructor( private _user:UserService, private router: Router, ) { }

  async currentUser () {
    await this._user.getCurrentUser().subscribe((response:{
     data: { names: string, surnames: string}
    } ) => {
      this.user = `${response.data.names} ${response.data.surnames}`
      console.log(response)
    }, error =>{ console.log(error)})
  }

  async sessionClose () {
    await this._user.getCurrentUser().subscribe((response) => {
       console.log(response)
       localStorage.removeItem('tokenEcuShopping')
       this.router.navigate(['/moduleProviders/login']);
     }, error =>{ console.log(error)})
  }

  ngOnInit(): void {
    this.currentUser()
  }

}
