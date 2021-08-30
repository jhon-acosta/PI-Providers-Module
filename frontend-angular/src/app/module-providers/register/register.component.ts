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
    email: '',
    codeForVerfication: ''
  }
  public confirmPassword = ''
  roles: Array<{ id: number, description: string }>
  typesIdentifications: Array<{ id: number, description: string }>
  provincesEc: Array<{ provincia: string }>
  registerWithOauth = undefined as string

  public preview: string;
  public avatar: any;
  public captureFiles: any;
  public hiddenRuc: boolean = false;
  public hiddenData: boolean = false;
  public roleDescription: string;
  public numbersLastRuc: string;
  public checkboxPrivacy: any;
  public firstNumberCellPhone:string;

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
        this.roleDescription = response.data.filter(element => element.description == 'Proveedor');
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
    if (event == 'Comprador') {
      this.hiddenRuc = true;
    } else {
      this.hiddenRuc = false;
    }
  }

  registerWithGoogle() {
    this.registerWithOauth = 'OauthGoogle'
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response: any) => {
        this.hiddenData = true;
        this.data = {
          ...this.data,
          email: response.additionalUserInfo.profile.email,
          names: response.additionalUserInfo.profile.given_name,
          surnames: response.additionalUserInfo.profile.family_name,
          cellPhone: response.user.phoneNumber || '0987654321'
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
        const dataUser = new FormData();
        dataUser.append('file', this.data.filePdf);
        if (this.hiddenData == true) {
          dataUser.append('user', JSON.stringify(dataGoogle));
        }
        dataUser.append('user', JSON.stringify(this.data));
        if (this.data.province == '') {
          return this.toastr.error('No registrado', 'Ingrese la provincia');
        }
        if (this.data.roleId == 0) {
          return this.toastr.error('No registrado', 'Ingrese su rol');
        }
        if (this.data.typeId == 0) {
          return this.toastr.error('No registrado',
            'Ingrese el tipo de identificación');
        } else {
          if (this.data.numberIdentification == '') {
            return this.toastr.error('No registrado',
              'Ingrese el número de identificación');
          } else {
            this.numbersLastRuc = this.data.numberIdentification.substr(-3)
            for (let index = 0; index < this.typesIdentifications.length; index++) {
              const element = this.typesIdentifications[index];
              if (this.data.typeId == element.id && element.description === 'RUC') {
                if (this.numbersLastRuc !== '001') {
                  return this.toastr.warning('N° inválido de Ruc',
                    'Verifique el número de dígitos el campo de identificación');
                }
                if (this.roleDescription[0]['id'] != this.data.roleId) {
                  return this.toastr.warning('Error de rol',
                    'El rol comprador no puede ingresar RUC');
                }
              }
              if (this.data.typeId == element.id &&
                element.description === 'Canét de conadis') {
                if (this.data.numberIdentification.length < 10 ||
                  this.data.numberIdentification.length > 10)
                  return this.toastr.warning('N° inválido del Carnét de conadis',
                    'Verifique el número de dígitos el campo de identificación');
              }
              if (this.data.typeId == element.id &&
                element.description === 'Cédula de identidad') {
                if (this.data.numberIdentification.length < 10 ||
                  this.data.numberIdentification.length > 10)
                  return this.toastr.warning('N° inválido de la Cédula de identidad',
                    'Verifique el número de dígitos el campo de identificación');
              }
            }
          }
        }
        if (this.registerWithOauth !== 'OauthGoogle') {
          if (this.data.names == '' || !/^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/.exec(this.data.names)) {
            return this.toastr.error('Error en el campo nombres', 'Verfique los caracteres ingresados o ingrese sus nombres');
          }
          if (this.data.surnames == '' || !/^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/.exec(this.data.surnames)) {
            return this.toastr.error('Error en el campo apellidos', 'Verifique los caracteres ingresados o ingrese sus apellidos');
          }
        }
        this.firstNumberCellPhone=this.data.cellPhone.substr(-20,2);
        console.log(this.firstNumberCellPhone)
        if (this.data.cellPhone == '' || this.firstNumberCellPhone !== '09') {
          return this.toastr.error('No registrado',
            'Verifique el número de teléfono');
        } else {
          if ((this.data.cellPhone.length < 10 ||
            this.data.cellPhone.length > 10)) {
            return this.toastr.warning('N° de ingresado incorrecto',
              'Verifique el número de teléfono');
          }
        }
        if (this.roleDescription[0]['id'] == this.data.roleId &&
          this.data.filePdf == '') {
          return this.toastr.error('No registrado',
            'Ingrese el certificado de Ruc');
        }
        if (this.hiddenData == false && this.data.email == '' ||
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.data.email)) {
          return this.toastr.error('No registrado',
            'Verifique el correo electrónico');
        }
        if (this.data.password == '' || !/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.exec(this.data.password)) {
          return this.toastr.error('La contraseña debe tener entre 8 y 16 caracteres, minúsculas, mayúsculas y al menos un caracter alfanumérico',
            'Contraseña débil');
        }
        if (this.registerWithOauth !== 'OauthGoogle') {
          if (this.confirmPassword == ''  || this.data.password !== this.confirmPassword ) {
            return this.toastr.error('Error en el campo',
              'Verifique la confirmación de la contraseña');
          }
        }
        if (this.checkboxPrivacy == true) {
          console.log(this.data)
          await this._register.registerUser(dataUser).subscribe(res => {
            this.title = 'Verificar cuenta'
            this.titleButton = 'Verificar'
            this.toastr.success('Revisé su bandeja de entrada',
              'Código enviado');
          })
        } else {
          return this.toastr.error('Politicas de privacidad',
            'Acepte los términos y condiciones');
        }
      } catch (error) { console.log(error) }
    } else if (this.title === 'Verificar cuenta') {
      if (this.dataVerify.email === '' ||
        this.dataVerify.codeForVerfication === '') {
        return this.toastr.warning('Campos incompletos');
      }
      try {
        await this._verify.verifyAccount(this.dataVerify).subscribe((res: {
          error?: { message: string }, data: { id: string }
        }) => {
          if (res.error?.message === 'Account not found') {
            return this.toastr.warning('No registrado', 'Correo electrónico');
          } else if (res.error?.message === 'error in code verification') {
            return this.toastr.info('Código no válido', '');
          }
          this.router.navigateByUrl('/moduleProviders/login');
          return this.toastr.success('Cuenta verificada', '');
        })
      } catch (error) { console.log(error) }
    }
  }

  handleInputChange(event): void {
    const target = event.target.checked;
    this.checkboxPrivacy = target;
  }
  //file pdf
  captureFile(event): void {
    this.data.filePdf = event.target.files[0];
    if (this.captureFiles == null) {
      this.captureFiles = event.target.files[0];
      this.extractBase64(this.captureFiles).then((repository: any) => {
        this.preview = repository.base;
      })
      if ('application/pdf' === this.captureFiles.type) {
        this.data.filePdf = this.captureFiles;
        this.captureFiles = this.data.filePdf
      } else {
        this.toastr.warning('Error de archivo', 'El archivo ingresado no es un PDF');
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
