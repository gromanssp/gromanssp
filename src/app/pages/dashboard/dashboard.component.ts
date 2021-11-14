import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { Grafico } from '../../models/grafico.model';

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

  grafico = new Grafico( 0, 0, 0);

  resumen: any = {
    objetos: ['Medicos', 'Hospitales', 'Usuarios', 'Computadoras'],
    datos: [ 0, 0, 0, 15]
  }

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
          return this.totalUsuarios = usuariosbd.total
        });
  }

  cargarHospitales() {
    // this.totalHospitales = this._hospitalService.totalHospitales;
    this._hospitalService.cargarHospitales(this.desde)
        .subscribe( (hospitalesbd: any) => this.totalHospitales = hospitalesbd.length);
        return this.totalHospitales;
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
        console.log("Usuarios", this.resumen.datos[0] = this.totalUsuarios);
        return this.resumen.datos[0] = this.totalUsuarios;
      }, 900);

    setTimeout(() => {
        console.log("Hospitales", this.resumen.datos[1] = this.totalHospitales);
        return this.resumen.datos[1] = this.totalHospitales;
      }, 900);

    setTimeout(() => {
        console.log("Medicos", this.resumen.datos[2] = this.totalMedicos);
        return this.resumen.datos[2] = this.totalMedicos;
      }, 900);
  }
}
