import { Component, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { MedicoService } from '../../services/medico/medico.service';
import { ChartType } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [provideCharts(withDefaultRegisterables())],
  styles: []
})
export class DashboardComponent implements OnDestroy {

  usuario: Usuario;
  desde: number = 0;
  suscripcion: Subscription;

  totalUsuarios: number = 0;
  totalHospitales: number = 0;
  totalMedicos: number = 0;

  objetos: string[] = ['Medicos', 'Hospitales', 'Usuarios', 'Computadoras'];
  datos: number[] = [1, 1, 1, 1];
  chartType: ChartType = 'doughnut';

  constructor(
    public _usuarioService: UsuarioService,
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService
   ) {
     this.suscripcion = this.cargarDatos()
     .subscribe(
       datos => console.log('Suscrito'),
       error => console.error('Error en el obs', error),
       () => console.log('El observador Termino!')
     );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (usuariosbd: any) => {
          return this.totalUsuarios = usuariosbd.total;
        });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales(this.desde)
        .subscribe( (hospitalesbd: any) => this.totalHospitales = hospitalesbd.length);
  }

  cargarMedicos() {
    this._medicoService.totalMedicos()
        .subscribe( (medicosbd: any) => {
          this.totalMedicos = medicosbd;
         });
  }

  cargarDatos(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      observer.next(this.usuario = this._usuarioService.usuario);
      observer.next(this.cargarUsuarios());
      observer.next(this.cargarHospitales());
      observer.next(this.cargarMedicos());
      setTimeout(() => {
          let totalUser = [];
          totalUser = new Array( this.totalUsuarios, this.totalMedicos, this.totalHospitales, 8);
          return this.datos = totalUser;
        }, 200);

      observer.complete();
    });

  }
}
