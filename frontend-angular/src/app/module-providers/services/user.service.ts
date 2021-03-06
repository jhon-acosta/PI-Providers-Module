import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = environment.endpoint
 
  constructor(private http: HttpClient) { 
    
  }

  getUserById(id:string): Observable<any> {
    return this.http.get(`${this.endpoint}/users/${id}`, {
    })
  }

  getCurrentUser(){
    var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('tokenEcuShopping')
     });
    return this.http.post(`${this.endpoint}/currentUser`,{ headers: reqHeader  })
  }

  updateUser(id:string, data: any){
    return this.http.post(`${this.endpoint}/users/${id}`,data);
  }


}
