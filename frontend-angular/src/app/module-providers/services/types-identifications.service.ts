import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesIdentificationsService {
  endpoint = environment.endpoint

  constructor(private http: HttpClient) { }

  getAllTypesIdentifications(): Observable<any> {
    let header = new HttpHeaders()
      .set('Type-content', 'application/json')
    return this.http.get(`${this.endpoint}/typeIdentificacions`, {
      headers: header
    })
  }
}
