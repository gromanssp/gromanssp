import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modals-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  cargando: boolean = true;

  totalRegistros: number = 0;
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuarios());

  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {

    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
          .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
          });
  }

  cambiarDesde( valor: number ) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
        .subscribe( ( usuarios: Usuario[] ) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ) {
      Swal.fire('No puede borrar usuario', 'No se puede borra a si mismo', 'error');
      return;
    }

    const swalConBotones = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-success'
      },
      buttonsStyling: false
    });

    swalConBotones.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a :' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    })
    .then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario( usuario._id )
            .subscribe( borrado => {
              console.log( borrado );
              this.cargarUsuarios();
            });
      } else {
        return;
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
      this._usuarioService.actualizarUsuario( usuario )
          .subscribe();
  }
}
