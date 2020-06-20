import { Component, OnInit } from '@angular/core';
import { API_Node_Service } from 'src/app/services/apinode.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api_node: API_Node_Service, private router: Router) { }

  Useremail: string;
  contrasennia: string;
  rol: string;
  res: boolean;
  alert: boolean = false;

  mensajeAlert: string = "";


  ngOnInit(): void {
  }

  loginProcess() {
    this.alert = false;

    let user = {
      userName:  this.Useremail,
      password: this.contrasennia
    };

    this.api_node.login(user).subscribe((result: any)=> {
      if(result.ok){

        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('user', this.Useremail);
        sessionStorage.setItem('rol', result.payload.roles);

        this.rol = result.payload.roles;

        if(this.rol == "ROL_BARRAS"){
          this.router.navigateByUrl('/histograma');
        }else{
          this.router.navigateByUrl('/pastel');
        }
      }
      else{
        this.alert = true;
        this.mensajeAlert = "Lo sentimos, el usuario y contraseña proporcionados no son validos. Favor de verificar.";
      }

    });
  }

}
