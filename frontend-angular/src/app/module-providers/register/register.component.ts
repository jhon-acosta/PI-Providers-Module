import { Component, OnInit } from '@angular/core';
import { RegisterI } from '../interfaces/Register';
import { RolesService } from '../services/roles.service';
import { TypesIdentificationsService } from '../services/types-identifications.service';

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
    pathImage: '',
    nameImage: '',
  }
  public confirmPassword = ''
  roles: Array<{ id: number, description: string}>
  typesIdentifications: Array<{ id: number, description: string}>

  constructor(
    private _roles:RolesService, 
    private _typesIdentifications:TypesIdentificationsService
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

  test () {
    console.log(this.data)
  }
  ngOnInit(): void {
    this.getAllRoles()
    this.getAllTypesIdentifications()
  }

}
