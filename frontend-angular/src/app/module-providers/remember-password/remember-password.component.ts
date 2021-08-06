import { Component, OnInit } from '@angular/core';
import { RememberPassowrdI } from '../interfaces/Interfaces';
import { RememberPasswordService } from '../services/remember-password.service';

@Component({
  selector: 'app-remember-password',
  templateUrl: './remember-password.component.html',
  styleUrls: ['./remember-password.component.css']
})

export class RememberPasswordComponent implements OnInit {

  public data: RememberPassowrdI = {
    email: ''
  }
  public success = ''
  public error = ''

  constructor(private _email: RememberPasswordService) { }

  timeMessage (msg: string, action?: string) {
    if ( action === 'error') {
      this.error = msg
    } else {
      this.success = msg
    }
    setTimeout(() => {
      this.error = ''
      this.success = ''
    }, 3500);
  }

  async rememberPassword () {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(this.data.email) || 
    this.data.email == ''
    ) { return this.timeMessage('Se requiere de un correo electrónico', 'error')}
    try {
      await this._email.rememberPassword(this.data).subscribe(res => {
        if (res.data.message === 'Email not found') {
          return this.timeMessage('Correo electrónico no registrado', 'error')
        }
        return this.timeMessage(
          'Correo enviado, revise su banjeda de entrada.',
          'success'
          )
      })
    } catch (error) { console.log(error) }
  }


  ngOnInit(): void {
  }
  
}
