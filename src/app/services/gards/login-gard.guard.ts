import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) {}

  canActivate() {

    if ( this._usuarioService.estaLogeado() ) {
      return true;
    } else {
      console.log('Bloqueado por el Gard');
      this.router.navigate(['/login']);
      return false;
    }

  }

}
