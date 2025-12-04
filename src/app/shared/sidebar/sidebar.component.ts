import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
    standalone: false
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public sideBar: SidebarService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.sideBar.cargarMenu();
  }

}
