import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';
// import map
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log(' Token Renovado');
          return true;
        }),
        catchError( err => {
          this.router.navigate(['/login']);
          Swal.fire('No se pudo renovar token', 'No fue posible renovar el token', 'error');
          return throwError( err );
        })
      );
  }

  estaLogeado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombrePropietario');
    localStorage.removeItem('apellidoPropietario');
    localStorage.removeItem('genero');
    localStorage.removeItem('inventario');
    localStorage.removeItem('serieSello');
    localStorage.removeItem('serieChasis');
    localStorage.removeItem('marcaChasis');
    localStorage.removeItem('sistema');
    this.router.navigate(['/login']);
  }


  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        this.guardarStorage( resp.id, resp.token, resp.Usuario, resp.menu);
        return true;
      }),
      catchError( err => {
        Swal.fire('Error en el login', err.error.mensaje, 'error');
        return throwError( err );
      })
    );
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario';
    console.log(usuario.nombre);
    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any) => {
      Swal.fire('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    }),
      catchError( err => {
        Swal.fire( err.error.mensaje, err.error.errors.message, 'error');
        return throwError( err );
      })
    );
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
      .pipe(
        map(( resp: any ) => {

        if ( usuario._id === this.usuario._id ) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }

        Swal.fire( 'Usuario actualizado', usuario.nombre, 'success' );
        return true;
      }),
        catchError( err => {
          Swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
          return throwError( err );
        })
      );
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
    .then( ( resp: any ) => {
      this.usuario.img = resp.usuario.img;
      Swal.fire('Imagen Actualizada', this.usuario.nombre, 'success');

      this.guardarStorage( this.usuario as any, this.token, id as any, this.menu);
    })
    .catch( resp => {
      console.log(resp);
    });
  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
          .pipe(map( (resp: any) => resp.usuarios));
  }

  borrarUsuario( id: string ) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url )
        .pipe(
          map( resp => {
            Swal.fire('Usuario borrado', 'Usuario borrado correctamente', 'success');
            return true;
          })
          );
  }
}
