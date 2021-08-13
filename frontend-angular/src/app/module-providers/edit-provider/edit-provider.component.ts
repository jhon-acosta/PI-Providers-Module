import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService} from '../services/user.service';
import { User } from '../interfaces/User';
import provinces  from '../utils/provinces.json';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {

  public users = new User();
  public preview: string;
  public id:any;
  public avatar:any;
  public urlAvatar:string='https://img.icons8.com/ultraviolet/80/000000/user.png';
   provincesEc: Array<{ provincia: string }>

  constructor( private _route:ActivatedRoute, 
    private _api:UserService, 
    private _sanitizer:DomSanitizer,
    ) { }

  ngOnInit(): void {
    this.id=this._route.snapshot.params.id;
    this.getDataUser();
    this.getProvinces();
  }

  getProvinces () {
    this.provincesEc = provinces
  }

  getDataUser(){
    this._api.getUserById(this.id).subscribe(res=>{
      this.users=res['data'];
      if(this.urlAvatar === this.users.markImage){
        this.avatar=this.users.markImage;
      }else{
        this.avatar=`http://127.0.0.1:8000/storage/${this.users.markImage}`;
      }
      console.log(this.users);
    })
  }

  updateUser(){
    const dataUser = new FormData();
    dataUser.append('filePdf', this.users.filePdf);
    dataUser.append('fileImg', this.users.markImage);
    dataUser.append('user', JSON.stringify(this.users));
    this._api.updateUser(this.id, dataUser).subscribe(res=>{
      console.log(res);
    })
  }

  //file pdf
  captureFile(event): void{
    const captureFiles = event.target.files[0];
    this.extractBase64(captureFiles).then((repository:any) =>{
      console.log(repository);
    })
    if('application/pdf'=== captureFiles.type){
      this.users.filePdf=captureFiles;
    }else{
      console.log('No es un pdf')
    }
    
  }
  //file pdf
  captureImg(event): void{
    const captureFiles = event.target.files[0];
    this.extractBase64(captureFiles).then((img :any) =>{
      this.preview = img.base;
    })
    if('image/jpeg'=== captureFiles.type || 'image/jpg' === captureFiles.type || 'image/png' === captureFiles.type){
      this.users.markImage=captureFiles;
    }else{
      console.log('No es un formato de imagen')
    }
    
  }
  extractBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeFile = window.URL.createObjectURL($event);
      const image = this._sanitizer.bypassSecurityTrustUrl(unsafeFile);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


}
