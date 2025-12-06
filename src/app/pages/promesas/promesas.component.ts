import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-promesas',
    templateUrl: './promesas.component.html',
    styles: [],
    imports: [
      DecimalPipe,
      FormsModule
    ],
    standalone: true
})
export class PromesasComponent implements OnInit {

  conteo: number = 0;

  constructor() {

    this.contarTres().then( mensaje => {
      console.log('Termino!', mensaje);
    })
    .catch( error => console.error('Error en la Promesa', error));
  }

  ngOnInit() {
  }


  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;

      const intervalo = setInterval( () => {
          contador += 1;
          console.log(contador);

          if ( contador === 3) {
            resolve(true);
            // reject('Un Simple error');
            clearInterval(intervalo);
          }
          return this.conteo = contador;
        }, 1000);
      });
  }

}
