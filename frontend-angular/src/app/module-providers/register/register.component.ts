import { Component, OnInit } from '@angular/core';
import { RegisterI } from '../interfaces/Interfaces';
import { RegisterService } from '../services/register.service';
import { RolesService } from '../services/roles.service';
import { TypesIdentificationsService } from '../services/types-identifications.service';
import provinces from '../utils/provinces.json';
import dataGoogle from '../utils/dataSimulation.json'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: RegisterI = {
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
    province: ''
  }
  public confirmPassword = ''
  roles: Array<{ id: number, description: string }>
  typesIdentifications: Array<{ id: number, description: string }>
  provincesEc: Array<{ provincia: string }>

  public preview: string;
  public avatar:any;
  public captureFiles:any;
  public hiddenRuc:boolean=false;
  public hiddenData:boolean=false;

  constructor(
    private _roles: RolesService,
    private _typesIdentifications: TypesIdentificationsService,
    private _register: RegisterService,
    private _sanitizer: DomSanitizer,
    private router: Router
  ) { }

  getAllRoles() {
    this._roles.getAllRoles().subscribe(response => {
      try {
        this.roles = response.data.filter(x => x.description !== 'Administrador')
      } catch (error) {
        console.log(error)
      }
    })
  }

  getAllTypesIdentifications() {
    this._typesIdentifications.getAllTypesIdentifications().subscribe(response => {
      try {
        this.typesIdentifications = response.data
        console.log(this.typesIdentifications)
      } catch (error) {
        console.log(error)
      }
    })
  }

  getProvinces() {
    this.provincesEc = provinces
  }

  captureInputRol(event):void {
    console.log(event)
    if(event == 'Comprador'){
      this.hiddenRuc=true;
    }else{
      this.hiddenRuc=false;
    }
  }

  registerWithGoogle(){
    this.hiddenData=true;
    for (const itemData of dataGoogle) {
      this.data.email=itemData.email;
      this.data.password=itemData.password;
      this.data.names=itemData.names;
      this.data.surnames=itemData.surnames;
      this.data.cellPhone=itemData.cellPhone;
    }
    console.log(dataGoogle);
  }

  async register () {
    try {
      console.log(this.data)
      const dataUser = new FormData();
      dataUser.append('file', this.data.filePdf);
      if(this.hiddenData == true){
        dataUser.append('user', JSON.stringify(dataGoogle));
      }
      dataUser.append('user', JSON.stringify(this.data));
      await this._register.registerUser(dataUser).subscribe(
        res => {
          console.log(res)
          console.log(res['message']['summary']);
        })
      console.log('registrado')
      this.router.navigateByUrl('/moduleProviders/login');
    } catch (error) {
      console.log(error)
    }
  }

  //file pdf
  captureFile(event): void{
    this.data.filePdf=event.target.files[0];
    if(this.captureFiles == null){
      this.captureFiles = event.target.files[0];
    this.extractBase64(this.captureFiles).then((repository:any) =>{
      this.preview = repository.base;
      //console.log(repository);
    })
    if('application/pdf'=== this.captureFiles.type){
      this.data.filePdf=this.captureFiles;
      this.captureFiles=this.data.filePdf
      console.log(this.data.filePdf)
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
