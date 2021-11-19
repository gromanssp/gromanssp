import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  desde: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.totalMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde)
        .subscribe( medicos  => {
          this.medicos = medicos;
          this.totalRegistros = medicos.total;
        });
  }

  totalMedicos() {
    this._medicoService.totalMedicos()
        .subscribe( total  => {
          this.totalRegistros = total;
        });
  }

  buscarMedico( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedico( termino )
        .subscribe( medicos  => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {
    this._medicoService.borrarMedico( medico._id )
        .subscribe( () => this.cargarMedicos() );
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;
    
    if ( desde >= this.totalRegistros) {
      return;
    }
    console.log(this.totalRegistros);
    if ( desde < 0 ) {
      return;
    }
    console.log(desde);

    this.desde += valor;
    this.cargarMedicos();
    this.totalMedicos();
  }

}
