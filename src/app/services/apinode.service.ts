import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL_API = environment.API.EndPoint.API_Node;

@Injectable({
  providedIn: 'root'
})

export class API_Node_Service {
  constructor(private http: HttpClient) { }
  
  login(req: any){
    return this.http.post(`${URL_API}api/auth/login`, req);
  }

  getCurrentUser(){
    const opts = {
      headers: new HttpHeaders({
        'authorization': 'bearer '+ sessionStorage.getItem('token')
      })
    };

    return !!this.http.get(`${URL_API}api/auth/verifyToken`, opts);
  }

}