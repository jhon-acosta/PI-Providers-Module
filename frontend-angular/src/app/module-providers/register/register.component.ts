import { Component, OnInit } from '@angular/core';
import { RegisterI } from '../interfaces/Interfaces';
import { RegisterService } from '../services/register.service';
import { RolesService } from '../services/roles.service';
import { TypesIdentificationsService } from '../services/types-identifications.service';
import provinces  from '../utils/provinces.json';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public data: RegisterI = {
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
  }
  public confirmPassword = ''
  roles: Array<{ id: number, description: string}>
  typesIdentifications: Array<{ id: number, description: string}>
  provincesEc: Array<{ provincia: string }>

  public preview: string;
  public avatar:any;
  public captureFiles:any;
  public hiddenRuc:boolean=false;

  constructor(
    private _roles:RolesService, 
    private _typesIdentifications:TypesIdentificationsService,
    private _register: RegisterService,
    private _sanitizer:DomSanitizer
    ) {}

  getAllRoles () {
    this._roles.getAllRoles().subscribe(response => {
      try {
        this.roles = response.data.filter(x => x.description !== 'admin')
      } catch (error) {
        console.log(error)
      }
    })
  }

  getAllTypesIdentifications () {
    this._typesIdentifications.getAllTypesIdentifications().subscribe(response => {
      try {
        this.typesIdentifications = response.data
        console.log(this.typesIdentifications)
      } catch (error) {
        console.log(error)
      }
    })
  }

  getProvinces () {
    this.provincesEc = provinces
  }

  captureInputRol(event):void {
    console.log(event)
    if(event == 'client'){
      this.hiddenRuc=true;
    }else{
      this.hiddenRuc=false;
    }
  }

  async test () {
    try {
      console.log(this.data)
      const dataUser=new FormData();
    dataUser.append('file',this.data.filePdf);
    dataUser.append('user', JSON.stringify(this.data));
      await this._register.registerUser(dataUser).subscribe(
        res=>{
               console.log(res)
               console.log(res['message']['summary']);
        })
      console.log('registrado')  
    } catch (error) {
      console.log(error)
    }
  }

  //file pdf
  captureFile(event): void{
    if(this.captureFiles == null){
      const captureFiles = event.target.files[0];
    this.extractBase64(captureFiles).then((repository:any) =>{
      this.preview = repository.base;
      //console.log(repository);
    })
    if('application/pdf'=== captureFiles.type){
      this.data.filePdf=captureFiles;
    }else{
      console.log('No es un pdf')
    }
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

  ngOnInit(): void {
    this.getAllRoles()
    this.getAllTypesIdentifications()
    this.getProvinces()
  }

}
