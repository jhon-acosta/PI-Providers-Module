import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  endpoint = environment.endpoint

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${this.endpoint}/login`, data)
  }
}
