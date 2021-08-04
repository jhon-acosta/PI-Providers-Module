import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { RegisterI } from '../interfaces/Register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  endpoint = environment.endpoint

  constructor(private http: HttpClient) { }

  registerUser (user: RegisterI): Observable<any> {
    return this.http.post(`${this.endpoint}/register`, user)
  }


}
