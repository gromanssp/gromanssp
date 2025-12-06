import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html',
    styles: [],
    imports: [
      RouterModule,
      CommonModule,
      ImagenPipe
    ],
    standalone: true
})
export class BusquedaComponent implements OnInit {

  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  usuarios: Usuario[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe( params => {
        const termino = params['termino'];
        this.buscar( termino );
      });
   }

  ngOnInit() {
  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {

          console.log(resp);
          this.hospitales = resp.hospitales;
          this.medicos = resp.Medicos;
          this.usuarios = resp.Usuarios;
        });
  }

}
