import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuario: Usuario;
  desde: number = 0;

  totalUsuarios: number = 0;
  totalHospitales: number = 0;
  totalMedicos: number = 0;

  objetos: Label[] = ['Medicos', 'Hospitales', 'Usuarios', 'Computadoras'];
  datos: SingleDataSet = [1, 1, 1, 1];
  chartType: ChartType = 'doughnut';

  constructor(
    public _usuarioService: UsuarioService,
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService
   ) {    }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this.cargarUsuarios();
    this.cargarMedicos();
    this.cargarHospitales();
    this.datosResumen();
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (usuariosbd: any) => {
          return this.totalUsuarios = usuariosbd.total;
        });
  }

  cargarHospitales() {
    // this.totalHospitales = this._hospitalService.totalHospitales;
    this._hospitalService.cargarHospitales(this.desde)
        .subscribe( (hospitalesbd: any) => this.totalHospitales = hospitalesbd.length);
  }

  cargarMedicos() {
    // this.totalMedicos = this._medicoService.totalMedico;
    this._medicoService.totalMedicos()
        .subscribe( (medicosbd: any) => {
          this.totalMedicos = medicosbd;
         });
  }

  datosResumen() {
    setTimeout(() => {
        let totalUser = [];
        totalUser = new Array( this.totalUsuarios, this.totalMedicos, this.totalHospitales, 8);
        return this.datos = totalUser;
      }, 200);
  }
}
