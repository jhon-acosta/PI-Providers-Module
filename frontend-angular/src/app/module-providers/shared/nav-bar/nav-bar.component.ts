import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  
  user: string
  email:string
  constructor( private _user:UserService, private router: Router, ) { }

  async currentUser () {
    await this._user.getCurrentUser().subscribe((response:{
     data: { names: string, surnames: string, email:string}
    } ) => {
      this.user = `${response.data.names} ${response.data.surnames}`
      this.email= response.data.email;
      console.log(response)
    }, error =>{ console.log(error)})
  }

  async sessionClose () {
   
    await this._user.getCurrentUser().subscribe((response) => {
       console.log(response)
       localStorage.removeItem('tokenEcuShopping');
       this.router.navigate(['/moduleProviders/login'])
        .then(() => {
          window.location.reload();
  });
     }, error =>{ console.log(error)})
  }

  ngOnInit(): void {
    this.currentUser()
  }


}
