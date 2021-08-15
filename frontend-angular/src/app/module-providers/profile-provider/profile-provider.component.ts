import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { RegisterI } from '../interfaces/Interfaces';
@Component({
  selector: 'app-profile-provider',
  templateUrl: './profile-provider.component.html',
  styleUrls: ['./profile-provider.component.css']
})
export class ProfileProviderComponent implements OnInit {

  constructor(private api:UserService) { }

  
  //esta variable es temporal hasta poder acceder al localstorage o route id 
  public id:any=12;
  public user:RegisterI={
    roleId: 0,
    typeId: 0,
    numberIdentification: '',
    names: '',
    surnames: '',
    email: '',
    password: '',
    cellPhone: '',
    markImage: '',
    filePdf: '',
    province:''
  };
  public urlAvatar:string='https://img.icons8.com/ultraviolet/80/000000/user.png';
  public avatar:any;
  public urlPdf:any;
  public nameDoc:any;

  ngOnInit(): void {
  
    this.getCurrentProvider();
    
  }

  getCurrentProvider(){
    this.api.getCurrentUser().subscribe(res=>{
      if(res['data']['roleId'] == 3){
        this.user=res['data'];
        this.urlPdf=this.user.filePdf;
        this.nameDoc=this.urlPdf.slice(13);

          if(this.user.markImage === this.urlAvatar ){
            this.avatar=this.user.markImage;
          }else{
            this.avatar=`http://127.0.0.1:8000/storage/${this.user.markImage}`;
          }
          console.log(res['data']);
      }
    })
  }

}
