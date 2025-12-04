import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modals-upload/modal-upload.service';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: [],
    standalone: false
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activateRoute.params.subscribe( params => {

      const id = params.id;
      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    });
   }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
        .subscribe( resp => {
          this.medico.img = resp.medico.img;
        });
  }

  guardarMedico( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe( medico => {
          this.medico._id = medico._id;
          this.router.navigate( ['/medico', medico._id] );
        });
  }

  cargarMedico( id: string ) {
      this._medicoService.cargarMedico( id )
          .subscribe( (medico: any) => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospitales( id )
        .subscribe( hospital => this.hospital = hospital);
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }
}
