import { Injectable } from '@angular/core';
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

  logout() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('tokenEcuShopping')
    });
    return this.http.post(`${this.endpoint}/logout`, { headers: reqHeader })
  }
}
