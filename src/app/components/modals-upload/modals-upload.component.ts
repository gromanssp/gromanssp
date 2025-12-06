import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

@Component({
    selector: 'app-modals-upload',
    templateUrl: './modals-upload.component.html',
    styles: [],
    imports: [
      ImagenPipe,
      CommonModule
    ],
    standalone: true
})
export class ModalsUploadComponent implements OnInit {

  xxx: any;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then ( resp => {
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();

        })
        .catch ( error => {
          console.log('Error en la carga');
        });
  }

}
