import { Component, OnInit } from '@angular/core';
import { RegisterI } from '../interfaces/Interfaces';
import { RegisterService } from '../services/register.service';
import { RolesService } from '../services/roles.service';
import { TypesIdentificationsService } from '../services/types-identifications.service';
import provinces  from '../utils/provinces.json'

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

  constructor(
    private _roles:RolesService, 
    private _typesIdentifications:TypesIdentificationsService,
    private _register: RegisterService,
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

  async test () {
    try {
      console.log(this.data)
      await this._register.registerUser(this.data).subscribe()
      console.log('registrado')  
    } catch (error) {
      console.log(error)
    }
  }
  ngOnInit(): void {
    this.getAllRoles()
    this.getAllTypesIdentifications()
    this.getProvinces()
  }

}
