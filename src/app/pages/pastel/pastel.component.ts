import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.scss']
})
export class PastelComponent implements OnInit {


  constructor(private north: NorthwindService, private router: Router) { }
  // Data Variables
  dataDimension: Label[] = [];
  dataValues: number[] = [];

  //Data Ng Select
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Dim Cliente Nombre]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Dim Producto Nombre]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Dim Empleado Nombre]' },
  ];

  dimensionName$: Observable<any>;
  yearItem$: Observable<any>;
  monthItem$: Observable<any>;

  selectedDimension = null;
  selectedDimensionName: string[] = [];
  selectedYear: string[] = [];
  selectedMonth: string[] = [];

  selectedElements: string[] = [];

  userName: string;
  logout: boolean = false;

  ngOnInit(): void {

    if(sessionStorage.getItem('rol') == "ROL_BARRAS"){
      this.router.navigateByUrl('/histograma');
    }

    this.userName = sessionStorage.getItem('user');
    this.logout = true;

    this.dimensionName$ = this.north.getItemsByDimension(`[Dim Cliente].[Dim Cliente Nombre]`,'ASC');
    this.yearItem$ = this.north.getItemsByDimension(`[Dim Tiempo].[Dim Tiempo Año]`,'BASC');
    this.monthItem$ = this.north.getItemsByDimension(`[Dim Tiempo].[Dim Tiempo Mes]`,'BASC');
  }


  onChangeValues($event){
    this.selectedElements = $event;

    console.log(this.selectedElements);

    this.north.getDataPieByDimension(this.selectedElements).subscribe((result: any)=> {
      this.dataDimension = result.datosDimension;
      this.dataValues = result.datosVenta;
    });
  }

  clearModel(){
    this.selectedDimensionName = [];
    this.selectedYear = [];
    this.selectedMonth = [];
    this.selectedElements = [];

    this.dataDimension = [];
    this.dataValues = [];
  }

  CerrarSesion(){
    sessionStorage.setItem('token','false');
    this.logout = false;
    this.router.navigate(['/login']);
  }

}