import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyAccountService {

  endpoint = environment.endpoint

  constructor(private http: HttpClient) { }

  verifyAccount(data: any) {
    return this.http.post(`${this.endpoint}/account-verification`, data)
  }

}
