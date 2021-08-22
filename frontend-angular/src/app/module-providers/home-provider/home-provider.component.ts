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
  provider:any;
  public urlAvatar:string='https://img.icons8.com/ultraviolet/80/000000/user.png';
  public avatar:any;
  public userEmail:string;
  public userPhone:string;
  public arrScore: string[]
  public scoreValue: number
  constructor( private _user:UserService, private router: Router, ) { }

  async currentUser () {
    await this._user.getCurrentUser().subscribe((response:{
     data: { 
       names: string,
       surnames: string,
       email:string,
       cellPhone:string,
       markImage:string
       score:string
    }
    } ) => {
      this.provider=response.data;
      this.userEmail=`${response.data.email}`
      this.userPhone=`${response.data.cellPhone}`
      this.user = `${response.data.names} ${response.data.surnames}`
      if(this.provider.markImage === this.urlAvatar ){
        this.avatar=this.provider.markImage;
      }else{
        this.avatar=`http://127.0.0.1:8000/storage/${this.provider.markImage}`;
      }
      this.scoreValue = parseInt(response.data.score)
      let score = parseInt(response.data.score)
      const scores = []
      for (let i = 0; i < score; i++) { scores.push('start') }
      this.arrScore = scores
      console.log(this.provider)
    }, error =>{ console.log(error)})
  }

  async sessionClose () {
    await this._user.getCurrentUser().subscribe((response) => {
       //console.log(response)
       localStorage.removeItem('tokenEcuShopping')
       this.router.navigate(['/moduleProviders/login']);
     }, error =>{ console.log(error)})
  }

  ngOnInit(): void {
    this.currentUser()
  }

}
