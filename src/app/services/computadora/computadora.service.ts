import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputadoraService {

  // Variables Paso1
  nombre: string = '';
  apellidos: string = '';
  genero: string = 'masculino';
  departamento: string = null;
  inventario: number = null;
  serieSello: number = null;
  serieChasis: string = '';
  marcaChasis: string = '';
  sistema: string = null;
  // Variables Paso2
  marcaPlaca: string = '';
  modeloPlaca: string = '';
  socket: string = null;
  microFrecuencia: string = null;
  memoriaNumero: string = '1';
  memoriaMarca: string = '';


  constructor() {
    this.cargaStrorage1();
  }

  cargarComputadoras(id: string) {
    console.log('Cargar computadoras', id);
  }

  limpiarStorage() {
  localStorage.removeItem('nombrePropietario');
  localStorage.removeItem('apellidoPropietario');
  localStorage.removeItem('genero');
  localStorage.removeItem('departamento');
  localStorage.removeItem('inventario');
  localStorage.removeItem('serieSello');
  localStorage.removeItem('serieChasis');
  localStorage.removeItem('marcaChasis');
  localStorage.removeItem('sistema');
  }

  cargaStrorage1() {
    if (localStorage.getItem('nombrePropietario')) {
        this.nombre = localStorage.getItem('nombrePropietario');
        this.apellidos = localStorage.getItem('apellidoPropietario');
        this.departamento = localStorage.getItem('departamento');
        this.genero = localStorage.getItem('genero');
        this.inventario = JSON.parse(localStorage.getItem('inventario'));
        this.serieSello = JSON.parse(localStorage.getItem('serieSello'));
        this.serieChasis = localStorage.getItem('serieChasis');
        this.marcaChasis = localStorage.getItem('marcaChasis');
        this.sistema = localStorage.getItem('sistema');
    }
  }
  // tslint:disable-next-line: max-line-length
  storagePaso1(nombre: string, apellidos: string, genero: string, inventario: number, serieSello: number, serieChasis: string, marcaChasis: string) {
    localStorage.setItem('nombrePropietario', nombre);
    localStorage.setItem('apellidoPropietario', apellidos);
    localStorage.setItem('genero', genero);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    localStorage.setItem('serieSello', JSON.stringify(serieSello));
    localStorage.setItem('serieChasis', serieChasis);
    localStorage.setItem('marcaChasis', marcaChasis);
    this.cargaStrorage1();
  }

  cargaStrorage2() {
    if (localStorage.getItem('marcaPlaca')) {
        this.marcaPlaca = localStorage.getItem('marcaPlaca');
        this.modeloPlaca = localStorage.getItem('modeloPlaca');
        this.socket = localStorage.getItem('socket');
        this.microFrecuencia = localStorage.getItem('microFrecuencia');
        this.memoriaNumero = JSON.parse(localStorage.getItem('memoriaNumero'));
        this.memoriaMarca = JSON.parse(localStorage.getItem('memoriaMarca'));
    }
  }

  storagePaso2(marcaPlaca: string, modeloPlaca: string, socket: number, microFrecuencia: number, memoriaNumero: number) {
    localStorage.setItem('marcaPlaca', marcaPlaca);
    localStorage.setItem('modeloPlaca', modeloPlaca);
    localStorage.setItem('socket', JSON.stringify(socket));
    localStorage.setItem('microFrecuencia', JSON.stringify(microFrecuencia));
    localStorage.setItem('memoriaNumero', JSON.stringify(memoriaNumero));
    this.cargaStrorage2();
  }

}
