import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: [],
    standalone: true
})
export class RxjsComponent implements OnInit, OnDestroy {


  suscription: Subscription;
  constructor() {

    this.suscription = this.regresarObservable()
    .subscribe(
      numero => console.log('Subscribe ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador Termino!')
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La Página se va a cerrar');
    this.suscription.unsubscribe();
  }

    regresarObservable(): Observable<any> {
      return new Observable( (observer: Subscriber<any>) => {

        let contador = 0;

        const intervalo = setInterval( () => {
          contador ++;

          const salida = {
            valor: contador
          };

          observer.next( salida );

          // if (contador === 3) {
          // clearInterval( intervalo );
          // observer.complete();
          // }

          // if ( contador === 2) {
          //   // clearInterval( intervalo );
          //   observer.error('Axilio');
          // }
        }, 1000);
      }).pipe(
        map( resp => resp.valor ),
        filter( ( valor, index) => {

          if ( (valor % 2) === 1 ) {
            // inpar
            return true;
          } else {
            // par
            return false;
          }

        })
      );
    }
}
