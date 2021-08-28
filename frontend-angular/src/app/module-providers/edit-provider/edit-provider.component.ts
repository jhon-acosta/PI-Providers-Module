import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService} from '../services/user.service';
import { User } from '../interfaces/User';
import provinces  from '../utils/provinces.json';
import bankName from '../utils/banksEC.json';

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
   banksEC:Array<{ bankName: string }>
   typeAccount:Array<string>=['Ahorros','Corriente'];
  public captureFiles:any;
  public captureImages:any;
  public hiddenRuc:boolean=false;
  constructor( private _route:ActivatedRoute, 
    private _api:UserService, 
    private _sanitizer:DomSanitizer, 
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.id=this._route.snapshot.params.id;
    this.getDataUser();
    this.getProvinces();
    this.getBanks();
  }


  getProvinces () {
    this.provincesEc = provinces
  }

  getBanks(){
    this.banksEC=bankName
  }

  getDataUser(){
    this._api.getUserById(this.id).subscribe(res=>{
      this.users=res['data'];
      if(res['data']['filePdf'] == null){
        console.log('no hay pdf porque es rol cliente');
        this.hiddenRuc=true;
      }
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
      if (this.users.bankName == '' || this.users.bankName == null) {
        return this.toastr.error('No registrado', 'Ingrese un Banco');
      }
      if (this.users.typeAccount == '' || this.users.typeAccount == null) {
        return this.toastr.error('No registrado', 'Ingrese el tipo de cuenta');
      }
      if (this.users.bankAccount == '' || this.users.bankAccount== null || this.users.bankAccount.length < 10) {
        return this.toastr.error('No registrado', 'Verifique el número de cuenta bancaria');
        
      }
    
    this._api.updateUser(this.id, dataUser).subscribe(res=>{
      console.log(res['data'])
      this.toastr.success('Se ha actualizado los cambios', 'Datos actualizados', {
        positionClass: 'toast-top-right'
      })
    },
     err => {
       this.toastr.warning('Intentalo más tarde', 'Error', {
        positionClass: 'toast-bottom-left'
  })
    })
  }

  //file pdf
  captureFile(event): void{
    this.users.filePdf=event.target.files[0];
    if (this.captureFiles == null) {
      this.captureFiles = event.target.files[0];
      this.extractBase64(this.captureFiles).then((repository: any) => {
        this.preview = repository.base;
      })
      if ('application/pdf' === this.captureFiles.type) {
        this.users.filePdf = this.captureFiles;
        this.captureFiles = this.users.filePdf
      } else {
        this.toastr.warning('Error de archivo', 'El archivo ingresado no es un PDF');
      }
    }
  }

  //file image
  captureImg(event): void{
    this.users.markImage=event.target.files[0];
    if(this.captureImages == null){
      this.captureImages = event.target.files[0];
    if('image/jpeg'=== this.captureImages.type || 'image/jpg' === this.captureImages.type || 'image/png' === this.captureImages.type){
      this.users.markImage=this.captureImages;
      this.captureImages=this.users.markImage;
    }else{
      this.toastr.warning('No registrado', 'El archivo no tiene un formato de imagen');
      console.log('No es un formato de imagen')
    }
    }
    this.extractBase64(this.users.markImage).then((img :any) =>{
      this.preview = img.base;
    })
    
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
