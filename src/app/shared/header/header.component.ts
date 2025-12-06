import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: [],
    imports: [
      ImagenPipe
    ],
    standalone: true
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;



  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }
}
