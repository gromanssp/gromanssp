import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComputadoraService } from '../../services/service.index';
// import { faCoffee, faMale } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-computer',
    templateUrl: './computer.component.html',
    styles: [],
    standalone: false
})
export class ComputerComponent implements OnInit {

  forma: FormGroup;

  paginas: any = {
    pag1: true,
    pag2: false,
    pag3: false,
    pag4: false
  };

  // Animaciones
  animationIn: boolean = true;
  animationNext: boolean = false;
  animationBack: boolean = false;
  // Variables de entorno
  paso: string;
  id: string;
  espera: boolean = false;
  memoriaChk: number = 1;
  repetir: any[] = [];

  ngOnInit(): void {
    this.cantidades(JSON.stringify(this.memoriaChk));
  }

  constructor(
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _computadoraService: ComputadoraService
    ) {
      // Cargar paginas
      activateRoute.params.subscribe( params => {
        const paso = params.paso;
        const id = params.id;
        switch (paso) {
          case 'paso1':
            this.datosPaginas(true, false, false, false, false);
            break;
          case 'paso2':
            this.datosPaginas(false, true, false, false, false);
            break;
          case 'paso3':
            this.datosPaginas(false, false, true, false, false);
            break;
          case 'paso4':
            this.datosPaginas(false, false, false, true, false);
            break;
          default:
            break;
        }
        this.paso = paso;
        this.id = id;
        // Formulario
        this.forma = new FormGroup ({
          paso1: new FormGroup({
            nombre: new FormControl(_computadoraService.nombre, [
              Validators.required,
              Validators.minLength(3)
              ]),
            apellidos: new FormControl(_computadoraService.apellidos, [
              Validators.required,
              Validators.minLength(3)
              ]),
            sexo: new FormControl(_computadoraService.genero),
            inventario: new FormControl(_computadoraService.inventario, [
              Validators.required,
              Validators.minLength(3)
              ]),
            serieSello: new FormControl(_computadoraService.serieSello),
            serieChasis: new FormControl(_computadoraService.serieSello),
            marcaChasis: new FormControl(_computadoraService.marcaChasis, [
              Validators.required,
              Validators.minLength(2)
              ]),
            sistema: new FormControl(_computadoraService.sistema)
          }),
          paso2: new FormGroup({
            marcaPlaca: new FormControl(_computadoraService.marcaPlaca, [
              Validators.required,
              Validators.minLength(2)
              ]),
            modeloPlaca: new FormControl(_computadoraService.modeloPlaca, [
              Validators.required,
              Validators.minLength(2)
              ]),
            socket: new FormControl(_computadoraService.socket, Validators.required),
            microFrecuencia: new FormControl(_computadoraService.microFrecuencia, Validators.required),
            memoriaNumero: new FormControl(_computadoraService.memoriaNumero, Validators.required),
            memoriaMarca: new FormControl(_computadoraService.memoriaMarca, Validators.required)
            // memoriaMarca2: new FormControl(_computadoraService.memoriaMarca2)
            // memoriaMarca3: new FormControl(_computadoraService.memoriaMarca3)
            // memoriaMarca4: new FormControl(_computadoraService.memoriaMarca4)
          }),
          paso3: new FormGroup({
            marcaFuente: new FormControl('', Validators.required),
            fuenteSerie: new FormControl('', Validators.required),
            fuenteCapacidad: new FormControl(null, Validators.required),
            fuenteMarca: new FormControl('', Validators.required),
            discoNumero: new FormControl('', Validators.required),
            discoMarca: new FormControl('', Validators.required)
          }),
          paso4: new FormGroup({
            mouseMarca: new FormControl(''),
            tecladoMarca: new FormControl(''),
            tecladoSerie: new FormControl(''),
            bocinaMarca: new FormControl(''),
            bocinaSerie: new FormControl('')
          })
        });
    });
   }

   // Eventos Select
  cambioDepartamento( departamento: string ) {
    localStorage.setItem('departamento', departamento);
  }

  cambioSO( sistema: string ) {
    localStorage.setItem('sistema', sistema);
  }

  cambioMicro( micro: string ) {
    localStorage.setItem('micro', micro);
  }

  cambioRAM( ram: string ) {
    localStorage.setItem('ram', ram);
  }

  cambioCapacidadRAM( capacidad: string, ranura: number ) {
    localStorage.setItem('capacidad' + ranura, capacidad);
  }

  cambioFrecuenciaRAM( frecuencia: string, ranura: number ) {
    localStorage.setItem('frecuencia' + ranura, frecuencia);
  }

  cambioTipoHD( HD: string ) {
    console.log(HD);
  }

  cambioCapacidadHD( capacidad: string ) {
    console.log(capacidad);
  }

  cambioCD( cd: string ) {
    console.log(cd);
  }

  cambioQuemador( cd: string ) {
    console.log(cd);
  }

  cambioMouse( mouse: string ) {
    console.log(mouse);
  }

  cambioTeclado( teclado: string ) {
    console.log(teclado);
  }

  cambioBocina( bocina: string ) {
    console.log(bocina);
  }

// cargarComputadora( id: string ) {
//     this._computadoraService.cargarComputadoras(id);
//   }

// Navegacion
datosPaginas(pagina1: boolean, pagina2: boolean, pagina3: boolean, pagina4: boolean, espera: boolean) {
    this.paginas.pag1 = pagina1;
    this.paginas.pag2 = pagina2;
    this.paginas.pag3 = pagina3;
    this.paginas.pag4 = pagina4;
    this.espera = espera;
    // this.router.navigate(['/computadora', id]);
  }

  // navegacion( animationIn: boolean, animationNext: boolean, animationBack: boolean ) {
  //   this.animationIn = animationIn;
  //   this.animationNext = animationNext;
  //   this.animationBack = animationBack;
  // }

checkPaso2() {
    if ( (this.paso !== 'paso2') && (this.paso === 'paso3') || (this.paso === 'paso4') ) {
      return true;
    } else {
      return false;
    }
  }

datosPaso1( animationIn: boolean, animationNext: boolean, animationBack: boolean) {
  this.animationIn = animationIn;
  this.animationNext = animationNext;
  this.animationBack = animationBack;

  if (this.forma.controls.paso1.valid) {
    this._computadoraService.storagePaso1(
                                          this.forma.controls.paso1['controls'].nombre.value,
                                          this.forma.controls.paso1['controls'].apellidos.value,
                                          this.forma.controls.paso1['controls'].sexo.value,
                                          this.forma.controls.paso1['controls'].inventario.value,
                                          this.forma.controls.paso1['controls'].serieSello.value,
                                          this.forma.controls.paso1['controls'].serieChasis.value,
                                          this.forma.controls.paso1['controls'].marcaChasis.value
                                            );
    this.router.navigate(['/computadora', 'paso2', this.id]);
    }
  }

cantidades( numero: string ) {
  const valor: number = JSON.parse(numero);
  this.memoriaChk = valor;
  let arreglo = new Array(1);
  console.log('Arreglo', arreglo);

  if ( valor === 1 ) {
    arreglo[0] = 1;
    return this.repetir = arreglo;
  }
  if (valor < this.repetir.length ) {
    for (let j = 4; j > valor; j--) {
      arreglo = this.repetir;
      arreglo[0] = arreglo.pop();
      this.repetir = arreglo;
      console.log('Repetir',this.repetir);
    }
  } else {
    for (let i = 2; i <= valor; i++) {
      arreglo[i - 1] = arreglo.push(i);
      this.repetir[i - 1] = arreglo[i - 1];
      console.log(this.repetir);
    }
  }
}

retroceder( animationIn: boolean, animationNext: boolean, animationBack: boolean ) {
  this.animationIn = animationIn;
  this.animationNext = animationNext;
  this.animationBack = animationBack;

  this.router.navigate(['/computadora', 'paso1', this.id]);
}

datosPaso2( animationIn: boolean, animationNext: boolean, animationBack: boolean ) {
  this.animationIn = animationIn;
  this.animationNext = animationNext;
  this.animationBack = animationBack;

  this.router.navigate(['/computadora', 'paso3', this.id]);
}

  // datosPaso3() {
  //   this.paginas.pagina3 = false;
  //   this.paginas.pagina4 = true;
  //   this.seleccion.step3 = true;
  //   this.espera = false;
  //   this.router.navigate(['/computadora', 'paso4']);
  // }

  datosCompletados() {
    console.log(this.forma.value);
    // this.router.navigate(['/computadoras']);
  }

}
