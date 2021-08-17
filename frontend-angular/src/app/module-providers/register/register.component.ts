import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import provinces from '../utils/provinces.json';
import { Component, OnInit } from '@angular/core';
import dataGoogle from '../utils/dataSimulation.json'
import { RegisterI, verifyAccountI } from '../interfaces/Interfaces';
import { AngularFireAuth } from '@angular/fire/auth';
import { RolesService } from '../services/roles.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RegisterService } from '../services/register.service';
import { TypesIdentificationsService } from '../services/types-identifications.service';
import { VerifyAccountService } from '../services/verify-account.service';



@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title = 'Registro en EcuShopping'
  // title = "Verificar cuenta"
  titleButton = "Registrarse"
  // titleButton = "Verificar"
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
  dataVerify: verifyAccountI = {
    email: undefined,
    codeForVerfication: undefined
  }
  public confirmPassword = ''
  roles: Array<{ id: number, description: string }>
  typesIdentifications: Array<{ id: number, description: string }>
  provincesEc: Array<{ provincia: string }>

  public preview: string;
  public avatar: any;
  public captureFiles: any;
  public hiddenRuc: boolean = false;
  public hiddenData: boolean = false;

  constructor(
    private _roles: RolesService,
    private _typesIdentifications: TypesIdentificationsService,
    private _register: RegisterService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private _verify: VerifyAccountService
  ) { }

  getAllRoles() {
    this._roles.getAllRoles().subscribe(response => {
      try {
        this.roles = response.data.filter(x => x.description !== 'Administrador')
      } catch (error) { return error }
    })
  }

  getAllTypesIdentifications() {
    this._typesIdentifications.getAllTypesIdentifications().subscribe(response => {
      try {
        this.typesIdentifications = response.data
      } catch (error) {
        console.log(error)
      }
    })
  }

  getProvinces() {
    this.provincesEc = provinces
  }

  captureInputRol(event): void {
    console.log(event)
    if (event == 'Comprador') {
      this.hiddenRuc = true;
    } else {
      this.hiddenRuc = false;
    }
  }

  registerWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response: any) => {
        this.hiddenData = true;
        this.data = {
          ...this.data,
          email: response.additionalUserInfo.profile.email,
          names: response.additionalUserInfo.profile.given_name,
          surnames: response.additionalUserInfo.profile.family_name,
          cellPhone: response.user.phoneNumber || '+593'
        }
        return this.toastr.success('Completar el registro', '');
      })
      .catch(err => {
        return this.toastr.error('Cuenta no seleccionada', 'Error');
      })
  }

  async register() {
    if (this.title === 'Registro en EcuShopping') {
      try {
        console.log(this.data)
        const dataUser = new FormData();
        dataUser.append('file', this.data.filePdf);
        if (this.hiddenData == true) {
          dataUser.append('user', JSON.stringify(dataGoogle));
        }
        dataUser.append('user', JSON.stringify(this.data));
        await this._register.registerUser(dataUser).subscribe(res => {
          console.log(res)
          console.log(res['message']['summary']);
          this.title = 'Verificar cuenta'
          this.titleButton = 'Verificar'
        })
      } catch (error) { console.log(error) }
    } else if(this.title === 'Verificar cuenta'){
      try {
        await this._verify.verifyAccount(this.dataVerify).subscribe((res: {
          message: string
        }) => {
          if (res.message === 'error in code verification') {
            return this.toastr.success('Código incorrecto', '');
          }
          this.toastr.success('Cuenta verificada', '');
          this.router.navigateByUrl('/moduleProviders/login');
        })
      } catch (error) { console.log(error) }
    }
  }

  //file pdf
  captureFile(event): void {
    this.data.filePdf = event.target.files[0];
    if (this.captureFiles == null) {
      this.captureFiles = event.target.files[0];
      this.extractBase64(this.captureFiles).then((repository: any) => {
        this.preview = repository.base;
        //console.log(repository);
      })
      if ('application/pdf' === this.captureFiles.type) {
        this.data.filePdf = this.captureFiles;
        this.captureFiles = this.data.filePdf
        console.log(this.data.filePdf)
      } else {
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
