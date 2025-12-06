import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modals-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';


@Component({
    selector: 'app-hospital',
    templateUrl: './hospital.component.html',
    styles: [],
    imports: [
      FormsModule,
      ImagenPipe
    ],
    standalone: true
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  cargando: boolean = false;
  totalRegistros: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospital();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarHospital());
  }

  muestraModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  cargarHospital() {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
        .subscribe( ( resp: any ) => {
            this.hospitales = resp;
            this.cargando = false;
        });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;

    if ( desde >= this._hospitalService.totalHospitales) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospital();
  }

  obtenerHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospital();
      return;
    }

    this.cargando = true;

    this._hospitalService.obtenerHospitales( termino )
          .subscribe( ( hospital: Hospital[] ) => {
          this.hospitales = hospital;
          this.cargando = false;
        });
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospitales( termino )
      .subscribe( (hospital: Hospital[]) => {
        this.hospitales = hospital;
        this.cargando = false;
      });
  }

  crearHospital() {

    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
    }).then( (valor: any ) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospitales( valor.value )
        .subscribe( () => this.cargarHospital() );
    });
  }

  borrarHospital( hospital: Hospital ) {

    const swalConBotones = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    });

    swalConBotones.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a :' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar',
      cancelButtonText: 'Cancelar!',
    })
    .then(borrar => {
      if (borrar.value) {
        this._hospitalService.borrarHospitales( hospital._id )
            .subscribe( () => {
              this.cargarHospital();
            });
      } else {
        return;
      }
    });
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
        .subscribe();
}
}
