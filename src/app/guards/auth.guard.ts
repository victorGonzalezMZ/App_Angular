import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { API_Node_Service } from 'src/app/services/apinode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private api_node: API_Node_Service){}
  canActivate(): boolean{
    if(this.api_node.getCurrentUser()){
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
