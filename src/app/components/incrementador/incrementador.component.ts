import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress', {static: true}) txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
   }

  ngOnInit() {
  //  console.log('Leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  onChange( newValue: number ) {
    // let elemHTML: any = document.getElementsByName('progreso')[0];

    // console.log(ElementRef);
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = Number( this.progreso );
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

  cambiarValor( valor: number) {
    if ( this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if ( this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    this.cambioValor.emit( this.progreso );
  }

}
