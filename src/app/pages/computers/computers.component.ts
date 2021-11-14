import { Component, OnInit } from '@angular/core';
import { Computadora } from '../../models/computadora.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { ComputadoraService } from '../../services/service.index';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styles: [
  ],
})
export class ComputersComponent implements OnInit {

  // elemento = NgxQrcodeElementTypes.URL;
  // correccion = NgxQrcodeErrorCorrectionLevels.HIGH;
  // value = 'Hola';

  computadoras: Computadora[] = [];

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _computadoraService: ComputadoraService
  ) { }

  ngOnInit(): void {
  }

  insertarComputadora() {
      this._computadoraService.limpiarStorage();
      this._computadoraService.cargaStrorage1();

      this.router.navigate(['/computadora', 'paso1', 'nuevo']);
  }

  cargarComputadoras() {

  }

  buscarComputadora( termino: string ) {

  }

  borrarComputadora( computadora: Computadora ) {
  }

}
