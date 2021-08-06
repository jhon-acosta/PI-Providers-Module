import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { RememberPassowrdI } from '../interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class RememberPasswordService {

  endpoint = environment.endpoint

  constructor(private http: HttpClient) { }

  rememberPassword (email: RememberPassowrdI): Observable<any> {
    return this.http.post(`${this.endpoint}/remember-password`, email)
  }

}
