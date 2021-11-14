import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
// import map
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) { }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'hospitales', id)
    .then( ( resp: any ) => {
      this.hospital.img = resp.hospital.img;
      Swal.fire('Imagen Actualizada', this.hospital.nombre, 'success');

      this.guardarStorage( this.hospital );
    })
    .catch( resp => {
      console.log(resp);
    });
  }

  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        })
      );
  }

  guardarStorage( hospital: Hospital) {
    localStorage.setItem('hospital', JSON.stringify(hospital));

    this.hospital = hospital;
  }

  obtenerHospitales( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
    .pipe(map( (resp: any) => resp.hospital));
  }

  actualizarHospital( hospital:	Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital )
      .pipe(map(( resp: any ) => {

          const hospitalDB: Hospital = resp.hospital;
          this.guardarStorage( hospitalDB );

          Swal.fire('Hospital actualizado', hospital.nombre, 'success');
          return true;
        })
      );
  }

  buscarHospitales(	termino:	string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
        .pipe(map( (resp: any) => resp.hospitales));
  }

  crearHospitales(	nombre:	string	) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } )
      .pipe(map( (resp: any) => resp.hospital));
  }

  borrarHospitales( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
        .pipe(
          map( resp => {
            Swal.fire('Hospital borrado', 'Hospital borrado correctamente', 'success');
            return true;
          })
        );
      }
}
